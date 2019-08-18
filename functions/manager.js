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
      console.log('Response status code: '+response.statusCode)
      if (error) {
         users.refresh();
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
      console.log('Response status code: '+response.statusCode)
      if (error) {
        console.log('ERROR');
         users.refresh();
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
    console.log("SPOTIFY_URI: "+spotifyURI);
    let userArray = users.getUsers();
    userArray.forEach(async (user, index) => {
      let options = {};
      let songinfoReqOptions = {};
      if (spotifyURI.includes("track")) {
        options = {
          url: 'https://api.spotify.com/v1/me/player/play',
          headers: { Authorization: 'Bearer ' + user.accessToken },
          body: {
            uris: [spotifyURI]
          },
          json: true
        }
        // songinfoReqOptions = {
        //   url: 'https://api.spotify.com/v1/tracks/',
        //   headers: { Authorization: 'Bearer ' + user.accessToken },
        //   json: true
        // };
      } else {
        options = {
          url: 'https://api.spotify.com/v1/me/player/play',
          headers: { Authorization: 'Bearer ' + user.accessToken },
          context: spotifyURI,
          json: true
        }
        // songinfoReqOptions = {
        //   url: 'https://api.spotify.com/v1/me/player/play',
        //   headers: { Authorization: 'Bearer ' + user.accessToken },
        //   json: true
        // };
      }


      await request.put(options, function (error, response, body) {
        console.log('Response status code: '+response.statusCode)
        if (error) {
          console.log('Error in startTrack');
           users.refresh();
        } else {
           console.log('NEW TRACK STARTED FOR '+user.info.id+'\n')
        }
      })

      if (index == userArray.length - 1) {
        // If this was the last user redirect back
        res.redirect('/');
      }
    })
  }
}
