"use strict"

import request from 'request'
import { globals } from './../config.js'

const clientId = globals.clientId
const clientSecret = globals.secret
// Performs a GET request that helps to check if the token expired
export function checkToken (token) {
  let options = {
    url: 'https://api.spotify.com/v1/tracks/5HakR2lfKC0gmbjBmMmqw',
    headers: { 'Authorization': 'Bearer ' + token},
    json: true
  }
  request.get(options, (error, res, body) => {
    if (!error && res.statusCode === 200) {
      return true
    } else {
      return false
    }
  })
}

export function refreshToken (refreshToken) {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, (error, res, body) => {
    if (!error && response.statusCode === 200) {
      return body.access_token
      console.log('Token refreshed');
    }
  })
}

export function generateRandomString (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
  return text
}
