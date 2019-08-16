"use strict"

import request from 'request'
import * as utils from './utils.js'
import * as users from './users.js'

export function addUser(accessToken, refreshToken) {
  let options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { Authorization: 'Bearer ' + accessToken },
    json: true
  }

  // use the access token to access the Spotify Web API
  request.get(options, function (error, response, body) {
    if (error) {
       console.log('ERROR GETTING USER INFO')
    } else {
        users.addUser(accessToken, refreshToken, body);
    }
  })
}

export function startTrack(req, res) {
  let userArray = users.getUsers();
  userArray.forEach((user, index) => {
    let options = {
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: { Authorization: 'Bearer ' + user.accessToken },
      json: true
    }

    request.get(options, function (error, response, body) {
      if (error) {
         users.refresh(refreshToken);
      } else {
         console.log('TRACK STARTED FOR '+index)
      }
    })
  })

}

export function stopTrack(req, res) {
  let userArray = users.getUsers();
  userArray.forEach((user, index) => {
    let options = {
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: { Authorization: 'Bearer ' + user.accessToken },
      json: true
    }

    request.get(options, function (error, response, body) {
      if (error) {
         users.refresh(refreshToken);
      } else {
         console.log('TRACK STOPPED FOR '+index+'\n')
         console.log(response)
         console.log('\n\nBODY\n')
         console.log(body)
      }
    })
  })

}

export function chooseTrack(req, res) {
  let newTrackURI = req.trackURI;
  let userArray = users.getUsers();
  userArray.forEach((user, index) => {
    let options = {
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: { Authorization: 'Bearer ' + user.accessToken },
      body: {
        context_uri: newTrackURI
      },
      json: true
    }

    request.get(options, function (error, response, body) {
      if (error) {
        console.log('Error in startTrack:\n' + error);
         users.refresh(refreshToken);
      } else {
         console.log('NEW TRACK STARTED FOR '+index)
      }
    })
  })
}
