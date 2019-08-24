import React from 'react'
import './UserList.css'

export default class UserList extends React.Component {
  render () {
    let counter = -1
    const userElements = this.props.users.map((element) => {
      counter++
      return (
        <div className={'UserItem'} key={`${element.id}:${counter}`}>
          <button className={'UserListButton'} onClick={this.props.onRemoveUser} >
            <span data-tag={counter}>{element.id}</span>
          </button>
        </div>
      )
    })
    counter = -1 // Reset counter before next render cycle (just in case)
    return (
      <div className={'UserList'}>
        <span>User List</span>
        <div className={'AddUserItem'}>
          <button className={'UserListButton'} onClick={this.props.onLogin}>
            <svg shapeRendering={'crispEdges'} viewBox={'0 0 36 36'}>
              <path d={'m28 20h -8v 8h -4v -8h -8v -4h 8v -8h 4v 8h 8v 4z'}></path>
            </svg>
            <span >Add User</span>
          </button>
        </div>
        {userElements}
      </div>
    )
  }
}
