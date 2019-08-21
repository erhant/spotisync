import React from 'react'
import NowPlaying from './Components/NowPlaying'
import UserList from './Components/UserList'
import OAuthConfig from './oauthConfig'

export default class App extends React.Component {
  state = {
    state: undefined,
    accessToken: undefined,
    users: []
  }

  generateRandomString (length) {
    let text = ''
    const charSpace = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      text += charSpace.charAt(Math.floor(Math.random() * charSpace.length))
    }
    return text
  }

  toQueryString (param) {
    const stringParts = []
    for (const prop in param) {
      // Create each query from params
      stringParts.push(`${encodeURIComponent(prop)}=${encodeURIComponent(param[prop])}`)
    }
    return stringParts.join('&')
  }

  // Get user info and create a user object in state
  // TODO: Separate api GET logic from method
  createUser = async (data) => {
    const res = await fetch(
      'https://api.spotify.com/v1/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data}`
        }
      }
    )
    const userData = await res.json()
    const user = {
      id: userData.id,
      token: data
    }
    this.setState({
      users: [...this.state.users, user]
    })
  }

  handleLogin = async (e) => {
    const promise = new Promise((resolve, reject) => {
      const newState = this.generateRandomString(16)
      this.setState({ state: newState })
      const authQuery = {
        client_id: OAuthConfig.clientID,
        redirect_uri: OAuthConfig.redirectURI,
        scope: OAuthConfig.scope,
        response_type: 'token',
        state: newState,
        show_dialog: true
      }

      // Handle callback data
      function receiveMessage (event) {
        const token = event.data.split('&')[0].split('=')[1]
        // Check event origin for security
        if (event.origin !== OAuthConfig.host) {
          reject({
            message: `ERROR: Origin ${event.origin} does not match ${OAuthConfig.host}`
          })
          return
        }

        // Check if there is data coming from the event
        if (token) {
        // Log out the new user to avoid session saving problems
        // oauthWindow.location.assign('https://spotify.com/logout')
        // TODO: Close pop-up after the auth and logout process is done
        } else {
          reject({
            message: 'ERROR: Message event does not contain data'
          })
        }
        window.removeEventListener('message', receiveMessage, false)
        resolve(token)
      }

      // Listen for the message from the auth window
      window.addEventListener('message', receiveMessage, false)

      // Constants for the pop-up OAuth window
      const width = 400
      const height = 600
      const left = window.screen.width / 2 - width / 2
      const top = window.screen.height / 2 - height / 2

      const oauthWindow = window.open(
      `https://accounts.spotify.com/authorize?${this.toQueryString(authQuery)}`,
      'Spotify OAuth',
      `menubar=no,location=no,resizable=no,scrollbars=no,width=${width},height=${height},left=${left},top=${top}`
      )
    })
    promise.then(data => {
      console.log('handleLogin successful')
      this.createUser(data)
    }, reason => {
      console.log('handleLogin failed')
    })
  }

  render () {
    return (
      <div>
        <div>
          <UserList onHandleLogin={this.handleLogin} users={this.state.users}/>
          <NowPlaying />
        </div>
      </div>
    )
  }
}
