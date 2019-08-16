"use strict"

const globals = {
  expressPort: 8080,
  clientId: '4c26f8ba0e80403b8565a8f78dc2230c',
  clientSecret: '6a216c412b6747648a6bc1a5fb5ca83a',
  redirectURI: 'http://localhost:8080/callback',
  scopes: 'user-read-email user-read-private user-modify-playback-state',
  tokenURI: 'https://accounts.spotify.com/api/token',
  stateKey: 'spotify_auth_state',
  expressURL: 'http://localhost:8080'
}

export { globals }
