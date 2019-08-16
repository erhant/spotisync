let userArray = [];
import * as utils from './utils.js'

export function addUser(accessToken, refreshToken, info) {
  userArray.push({
    accessToken: accessToken,
    refreshToken: refreshToken,
    info: info});
}

export function getUsers() {
  return userArray;
}

export function refreshUsers() {
  // Find the user with the refresh token
  userArray.map((user) => {
    let newAccessToken = utils.refresh(user.refreshToken);
    user["accessToken"] = newAccessToken;
    return user;
  })
}

export function getUserByIndex(index) {
  return userArray[index]
}

export function getUserCount() {
  return userArray.length;
}
