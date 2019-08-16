"use strict"

import { secrets } from './secretConfig.js'

const globals = {
  expressPort: 80,
  clientId: secrets.clientId,
  clientSecret: secrets.clientSecret,
  redirectURI: 'http://localhost/callback',
  scopes: 'user-read-email user-read-private user-modify-playback-state',
  tokenURI: 'https://accounts.spotify.com/api/token',
  stateKey: 'spotify_auth_state',
  expressURL: 'http://localhost'
}

export { globals }
