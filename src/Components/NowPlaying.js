import React from 'react'
import './NowPlaying.css'

export default class NowPlaying extends React.Component {
  render () {
    const trackInfo = this.props.track
    if (trackInfo === undefined) {
      return (<div></div>)
    } else {
      return (
        <div className={'NowPlaying'}>
          <img src={trackInfo.album.cover}/>
          <div className={'TrackInfo'}>
            <h1 className={'TrackName'}>{trackInfo.name}</h1>
            <h2 className={'AuthorNames'}>{trackInfo.authors}</h2>
          </div>
        </div>
      )
    }
  }
}
