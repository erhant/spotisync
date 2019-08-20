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

export function getTrackInfo(spotifyURI, accessToken) {
  // First we need to obtain the id form the URI
  let regex = /[^:]*$/; // Characters from the end until a ':' is seen is the id.
  let trackId = regex.exec(spotifyURI);
  let options = {
    url: 'https://api.spotify.com/v1/tracks/'+trackId,
    headers: { Authorization: 'Bearer ' + accessToken },
    json: true
  }
  request.get(options, (error, res, body) => {
    if (!error && res.statusCode === 200 || res.statusCode === 204) {
      console.log('Track name: '+body.name+'\nArtist: '+body.artists[0].name+'\nAlbum: '+body.album.name);
    } else {
      console.log('Error retrieving track info');
    }
  })
}

export function generateRandomString (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
  return text
}

export function decodeStatusCode(statusCode) {
  switch (statusCode) {
    case 200: return '200\tOK\nThe request has succeeded and returned body and headers';
    case 201: return '201\tCREATED\nThe request has been fulfilled and resulted in a new resource being created';
    case 202: return '202\tACCEPTED\nThe request has been accepted but not yet completed the process';
    case 204: return '204\tNO CONTENT\nThe request has succeeded but returns no message body';
    case 304: return '304\tNOT MODIFIED';
    case 400: return '400\tBAD REQUEST\nThe server could not understand the request';
    case 401: return '401\tUNAUTHORIZED\nThe server requires authentication';
    case 403: return '403\tFORBIDDEN\nThe server refuses to fulfill the request';
    case 404: return '404\tNOT FOUND\nRequest resource could not be found';
    case 500: return '500\tINTERNAL SERVER ERROR\nUsually does not happen, if happens report to spotify';
    case 429: return '429\tTOO MANY REQUESTS';
    case 502: return '502\tBAD GATEWAY';
    case 503: return '503\tSERVICE UNAVAILABLE\nYou can try sending the request again a bit later';
    default: return 'Unknown status code'+statusCode;
  }
}
