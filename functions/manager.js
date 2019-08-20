"use strict"

import request from 'request'
import * as utils from './utils.js'
import * as users from './users.js'
import * as errorHandler from './errorHandler.js'

export function addUser(accessToken, refreshToken) {
  let options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { Authorization: 'Bearer ' + accessToken },
    json: true
  }

  // use the access token to access the Spotify Web API
  request.get(options, function (error, response, body) {
    if (error) {
       errorHandler.handle(error, statusCode)
    } else {
        if (users.exists(body.id)) {
          console.log('User '+body.id+' exists.');
        } else {
          users.addUser(accessToken, refreshToken, body);
          console.log('Added user: '+body.id);
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
      console.log(utils.decodeStatusCode(response.statusCode))
      if (error) {
         errorHandler.handle(error, statusCode);
      } else {
         console.log('TRACK STARTED FOR '+user.info.id+'\n')
      }
    })

    if (index == userArray.length - 1) {
      // If this was the last user redirect back
      res.redirect('/');
    }
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
      console.log(utils.decodeStatusCode(response.statusCode))
      if (error) {
        errorHandler.handle(error, statusCode);
      } else {
         console.log('TRACK STOPPED FOR '+user.info.id+'\n')
      }
    })

    if (index == userArray.length - 1) {
      // If this was the last user redirect back
      res.redirect('/');
    }
  })

}

export function chooseTrack(req, res) {
  // read query string parameter
  if (req.query.id) {
    let spotifyURI = req.query.id;
    let userArray = users.getUsers();
    utils.getTrackInfo(spotifyURI, userArray[0].accessToken); // this is async
    userArray.forEach(async (user, index) => {
        let options = {
            url: 'https://api.spotify.com/v1/me/player/play',
            headers: { Authorization: 'Bearer ' + user.accessToken },
            body: {
              uris: [spotifyURI]
            },
            json: true
          }
        await request.put(options, function (error, response, body) {
          console.log(utils.decodeStatusCode(response.statusCode))
          if (error) {
            errorHandler.handle(error);
          } else if (response.statusCode === 404) {
            console.log('No Active Device for '+user.info.id+'\n');
          } else {
             console.log('NEW TRACK STARTED FOR '+user.info.id+'\n');
          }
        })

        if (index == userArray.length - 1) {
          // If this was the last user redirect back
          res.redirect('/');
        }
    })
  } else {
    console.log('No track id given, use:\nlocalhost/chooseTrack?id={your_track_id_here}')
  }
}

export function getDevices(req, res) {
  let userArray = users.getUsers();
  userArray.forEach(async (user, index) => {
    let options = {
      url: 'https://api.spotify.com/v1/me/player/devices',
      headers: { Authorization: 'Bearer ' + user.accessToken },
      json: true
    }
    await request.get(options, function (error, response, body) {
      console.log(utils.decodeStatusCode(response.statusCode))
      if (error) {
        errorHandler.handle(error);
      } else {
        console.log("DEVICES FOR "+user.info.id+'\n')
        console.log(body.devices);
      }
    })

    if (index == userArray.length - 1) {
      // If this was the last user redirect back
      res.redirect('/');
    }
  })
}
