import OAuthConfig from './oauthConfig'

// Get the right 'window' target (the main page)
const target = window.self === window.top ? window.opener : window.parent
const hash = window.location.hash
if (hash) {
  target.postMessage(hash, OAuthConfig.host)
}
