import React from 'react'

export default class NowPlaying extends React.Component {
  render () {
    const trackInfo = this.props.track === undefined ? '-' : this.props.track
    return (
      <div>Now Playing {trackInfo.name} by {trackInfo.authors}</div>
    )
  }
}
