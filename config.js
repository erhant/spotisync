"use strict"

const globals = {
  expressPort: 80,
  clientId: '4c26f8ba0e80403b8565a8f78dc2230c',
  clientSecret: '6a216c412b6747648a6bc1a5fb5ca83a',
  redirectURI: 'http://localhost/callback',
  scopes: 'user-read-email user-read-private ',
  tokenURI: 'https://accounts.spotify.com/api/token',
  stateKey: 'spotify_auth_state'
}

export { globals }
