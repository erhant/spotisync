"use strict"

import request from 'request'

// Performs a GET request that helps to check if the token expired
export function checkToken (token) {
  let options = {
    url: 'https://api.spotify.com/v1/tracks/5HakR2lfKC0gmbjBmMmqw',
    headers: { 'Authorization': 'Bearer ' + token},
    json: true
  }
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return true
    } else {
      return false
    }
  })
}
