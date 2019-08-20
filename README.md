# spotisync
A simple program that will play the same song on multiple devices using different Spotify accounts.

## Usage
In the console type `npm start` to start the server. In doing so:
* localhost/login -> Login to a Spotify account
* localhost/users -> Display logged in users

For the requests below the accounts must have an active device. We can not force an inactive device to play a song.
* localhost/startTrack -> Continue the player
* localhost/stopTrack -> Stop the player
* localhost/chooseTrack?id={spotify_uri} -> Start a track on every user

Due to requests, the tracks are not perfectly at the same timeframe.

### Debugging
* localhost/debug/refreshUsers -> Refresh active tokens for each user
* localhost/debug/getDevices -> Get device list for each user to see who has which device and whether they are active or not

## Humiliation Disclaimer
This code is written in a reaaallly sloppy way.
