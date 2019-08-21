import React from 'react'

export default class UserList extends React.Component {
  render () {
    let counter = -1
    const userElements = this.props.users.map((element) => {
      counter++
      return (
        <div key={`${element.id}:${counter}`}>
          <p><b>User ID:</b> {element.id}</p>
          <p><b>User Token:</b> {element.token}</p>
          <p><b>Index</b> {counter}</p>
          <button onClick={this.props.onRemoveUser} data-tag={counter}>X</button>
        </div>
      )
    })
    counter = -1 // Reset counter before next render cycle (just in case)
    return (
      <div>
        {userElements}
        <button onClick={this.props.onLogin}>Add User</button>
      </div>
    )
  }
}
