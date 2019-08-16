"use strict"

import { globals } from './../config.js'
import { generateRandomString } from './utils.js'
import * as manager from './manager.js'
import querystring from 'querystring'
import request from 'request'

const clientId = globals.clientId // Your client id
const clientSecret = globals.clientSecret // Your secret
const redirectURI = globals.redirectURI // Your redirect uri
const scopes = globals.scopes // Your scopes
const stateKey = globals.stateKey


export function authenticator (req, res) {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)


  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scopes,
      redirect_uri: redirectURI,
      state: state
    }))

}

export function tokenRetriever (req, res) {
  console.log('i start token retrival')
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }))
  } else {
    res.clearCookie(stateKey)
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectURI,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    }

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // User is authorized correctly
        const accessToken = body.access_token
        const refreshToken = body.refresh_token
        manager.addUser(accessToken, refreshToken);
      }
    })
  }
}
