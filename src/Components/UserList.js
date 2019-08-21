import React from 'react'

export default class UserList extends React.Component {
  render () {
    let userElements = this.props.users.map((element) => {
      return (
        <div>
          <p><b>User ID:</b> {element.id}</p>
          <p><b>User Token:</b> {element.token}</p>
        </div>
      )
    })
    return (
      <div>
        {userElements}
        <button onClick={this.props.onHandleLogin}>Add User</button>
      </div>
    )
  }
}
