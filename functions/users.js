let userArray = [];
import * as utils from './utils.js'

export function exists(userId) {
  let array = userArray.filter(x => x.info.id === userId)
  return array.length > 0
}

export function addUser(accessToken, refreshToken, info) {
  userArray.push({
    accessToken: accessToken,
    refreshToken: refreshToken,
    info: info});
}

export function getUsers() {
  return userArray;
}

export function refresh() {
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
