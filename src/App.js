import React from 'react'
import NowPlaying from './Components/NowPlaying'
import UserList from './Components/UserList'
import OAuthConfig from './oauthConfig'
import Util from './utils'
import './App.css'

export default class App extends React.Component {
  state = {
    state: undefined,
    god: undefined,
    users: [],
    usernames: [], // For quicker searching
    ready: undefined,
    hasLoadListener: undefined,
    currentTrack: undefined
  }

  componentDidMount () {
    // See if the browser has finished loading all resources to avoid errors
    window.addEventListener('load', this.setState({ ready: true, hasLoadListener: true }))
    // Start data refresh loop
    this.refreshData()
  }

  // Get user info and create a user object in state
  // TODO: Separate api GET logic from method
  createUser = async (data) => {
    // This stricktly needs to be true for this whole function to work as intended
    if (this.state.users.length !== this.state.usernames.length) {
      return console.error('ERROR: User array length mismatch')
    }

    this.createPlayer(data)
    const resUserData = await fetch(
      'https://api.spotify.com/v1/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data}`
        }
      }
    )
    // TODO: Checkbox on the UI to enable/disable output
    const resActiveDevices = await fetch(
      'https://api.spotify.com/v1/me/player/devices',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data}`
        }
      }
    )
    // TODO: Should probably allow for there to be no active devices
    if ( resUserData.status === 200 && resActiveDevices.status === 200 ) {
      const activeDevices = await resActiveDevices.json()
      const userData = await resUserData.json()
      // Make sure that the user does not already exist
      if (this.state.usernames.indexOf(userData.id) === -1) {
        let user = {
          id: userData.id,
          token: data,
          devices: [{
            name: activeDevices.devices[0].name,
            id: activeDevices.devices[0].id
          }]
        }

        // When there are no users, the first will be the god
        if (this.state.usernames.length === 0){
          user.isGod = true
          await this.setState({
            god: user,
            users: [...this.state.users, user],
            usernames: [...this.state.usernames, userData.id]
          })
        } else {
          user.isGod = false
          await this.setState({
            users: [...this.state.users, user],
            usernames: [...this.state.usernames, userData.id]
          })
        }
      } else {
        return console.error('ERROR: User already exists')
      }
    } else {
      return console.debug(`DEBUG: Received a ${resUserData.status} status when fetching user data and a ${resActiveDevices.status} status when fetching active device data`)
    }
  }

  updateTrack = async (e) => {
    if (this.state.god) {
        const resTrackData = await fetch(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + this.state.god.token
            }
          }
        )
        if (resTrackData.status === 200) {
          const trackData = await resTrackData.json()
          let authorArray = []
          for (let i = 0; i < trackData.item.artists.length; i++) {
            authorArray.push(trackData.item.artists[i].name)
          }
          const authors = authorArray.join(', ')
          const trackObj = {
            name: trackData.item.name,
            authors: authors,
            album: {
              name: trackData.item.album.name,
              cover: trackData.item.album.images[0].url
            }
          }
          this.setState({currentTrack: trackObj})
        } else {
          this.setState({currentTrack: undefined})
          return console.debug(`DEBUG: Received a ${resTrackData.status} status when updating track (most likely nothing is playing)`)
        }
    } else {
      this.setState({currentTrack: undefined})
      return console.debug('DEBUG: God does not exist (most likely no users added)')
    }
  }

  handleRemoveUser = async (e) => {
    const index = await e.target.getAttribute('data-tag')
    if (index > -1) {
      const tempUserArray = await [...this.state.users]
      const tempUsernameArray = await [...this.state.usernames]
      tempUserArray.splice(index, 1)
      tempUsernameArray.splice(index, 1)
      if (this.state.users[index].isGod === true) {
        await this.setState({god: undefined})
      }
      await this.setState({
        users: tempUserArray,
        usernames: tempUsernameArray
      })
    } else {
      return console.error('ERROR: Counter variable in UserList component failed')
    }
  }

  handleUserLogin = async (e) => {
    const promise = new Promise((resolve, reject) => {
      const newState = Util.generateRandomString(16)
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
          reject(console.error(`ERROR: Origin ${event.origin} does not match ${OAuthConfig.host}`))
          return
        }

        // Check if there is data coming from the event
        if (token) {
        // Log out the new user to avoid session saving problems
        // oauthWindow.location.assign('https://spotify.com/logout')
        // TODO: Close pop-up after the auth and logout process is done
        } else {
          reject(console.error('ERROR: Message event does not contain data'))
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
      `https://accounts.spotify.com/authorize?${Util.toQueryString(authQuery)}`,
      'Spotify OAuth',
      `menubar=no,location=no,resizable=no,scrollbars=no,width=${width},height=${height},left=${left},top=${top}`
      )
    })
    promise.then(data => {
      this.createUser(data)
    }, reason => {
      console.error('ERROR: handleLogin() failed')
    })
  }

  createPlayer = async (token) => {
    if (this.state.ready && this.state.hasLoadListener) {
      // After the initial load, we don't need it anymore
      // Ready will remain true!
      window.removeEventListener('load', this.setState({ ready: true }))
      this.setState({ hasLoadListener: false })
    }
    // This should be the state after the initial load
    if (this.state.ready && this.state.hasLoadListener === false) {
      console.log('inside createPlayer')
    }
  }

  refreshData = async () => {
    this.updateTrack()
    setTimeout(this.refreshData, 2000)
  }

  render () {
    return (
      <div className={'App'}>
          <UserList onLogin={this.handleUserLogin} onRemoveUser={this.handleRemoveUser} users={this.state.users} />
          <NowPlaying track={this.state.currentTrack}/>
      </div>
    )
  }
}
