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
        if (users.exists(body.id)) {
          console.log('User '+body.id+' exists.');
        } else {
          users.addUser(accessToken, refreshToken, body);
        }

    }
  })
}

export function startTrack(req, res) {
  let userArray = users.getUsers();
  userArray.forEach( async (user, index) => {
    let options = {
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: { Authorization: 'Bearer ' + user.accessToken },
      json: true
    }

    await request.put(options, function (error, response, body) {
      console.log('Response status code: '+response.statusCode)
      if (error) {
         users.refresh(refreshToken);
      } else {
         console.log('TRACK STARTED FOR '+user.info.id+'\n')
      }
    })
  })

}

export function stopTrack(req, res) {
  let userArray = users.getUsers();
  userArray.forEach(async (user, index) => {
    let options = {
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: { Authorization: 'Bearer ' + user.accessToken },
      json: true
    }

    await request.put(options, function (error, response, body) {
      console.log('Response status code: '+response.statusCode)
      if (error) {
        console.log('ERROR');
         users.refresh(refreshToken);
      } else {
         console.log('TRACK STOPPED FOR '+user.info.id+'\n')
      }
    })
  })

}

export function chooseTrack(req, res) {
  let newTrackURI = req.trackURI;
  let userArray = users.getUsers();
  userArray.forEach(async (user, index) => {
    let options = {
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: { Authorization: 'Bearer ' + user.accessToken },
      body: {
        uris: [newTrackURI]
      },
      json: true
    }

    await request.put(options, function (error, response, body) {
      console.log('Response status code: '+response.statusCode)
      if (error) {
        console.log('Error in startTrack');
         users.refresh(refreshToken);
      } else {
         console.log('NEW TRACK STARTED FOR '+user.info.id+'\n')
      }
    })
  })
}
