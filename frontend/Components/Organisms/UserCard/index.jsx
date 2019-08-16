import React from 'react'
import Text from '../../Atoms/Text/index.jsx'
import './index.css'

export default class UserCard extends React.Component {
  render () {
    return (
      <div className={'UserCard'}><Text type={'h1'} content={this.props.name} /></div>
    )
  }
}
