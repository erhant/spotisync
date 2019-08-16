import React from 'react'
import './text.css'

export default class Text extends React.Component {
  render () {
    switch (this.props.type) {
      case 'h1':
        return (<h1 className={'aero-h1'}>{this.props.content}</h1>)
      case 'h2':
        return (<h2 className={'aero-h2'}>{this.props.content}</h2>)
      case 'h3':
        return (<h3 className={'aero-h3'}>{this.props.content}</h3>)
      case 'h4':
        return (<h4 className={'aero-h4'}>{this.props.content}</h4>)
      case 'h5':
        return (<h5 className={'aero-h5'}>{this.props.content}</h5>)
      case 'h6':
        return (<h6 className={'aero-h6'}>{this.props.content}</h6>)
      case 'p':
        return (<p>{this.props.content}</p>)
      default:
        throw new Error("Invalid 'type' property specified, available types are h1-h6, p")
    }
  }
}
