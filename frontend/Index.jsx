import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './Index.css'

import UserCard from './Components/Organisms/UserCard/index.jsx'
import AddCard from './Components/Organisms/AddCard/index.jsx'

class Index extends React.Component {
  constructor() {
    super()
    this.getUsers = this.getUsers.bind(this)
    this.state = {
      users: [],
      userElements: []
    }
    this.getUsers()
  }
  getUsers() {
    axios.get('http://localhost:8080/users')
    .then(function (response) {
      // handle success
      this.state.users = response
      console.log(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .finally(function () {
      // always executed
    })
    this.state.userElements = this.state.users.map((element) => {
      return(<UserCard
      name={element.name}
      accessToken={element.accessToken}
      key={`Usercard-${name}`}
      />)
    })
  }
  render() {
    return(<div className={'Index'}>{this.state.userElements}<AddCard/></div>)
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'))
