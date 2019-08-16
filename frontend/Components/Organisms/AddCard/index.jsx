import React from 'react'
import Text from '../../Atoms/Text/index.jsx'
import './index.css'

export default class AddCard extends React.Component {
  render () {
    return (
      <div className={'AddCard'}><a href='https://localhost:8080/login'><Text type={'h1'} content={'Add User'}/></a></div>
    )
  }
}
