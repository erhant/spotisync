# spotisync
A simple program that will play the same song on multiple devices using different Spotify accounts.

## Usage
In the console type `npm start` to start the server. In doing so:
* localhost/login -> Login to a Spotify account
* localhost/startTrack -> Continue the player
* localhost/stopTrack -> Stop the player
* localhost/chooseTrack?id={spotify_uri} -> Starts a track

User must have an active device for these to work. We can not force an inactive device to play a song.

### Debugging
* localhost/debug/users -> Print the users to server console
* localhost/debug/refreshUsers -> Refresh active tokens for each user
* localhost/debug/getDevices -> Get device list for each user

## Humiliation Disclaimer
This code is written in a reaaallly sloppy way.
