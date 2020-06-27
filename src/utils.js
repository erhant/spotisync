function generateRandomString (length) {
  let text = ''
  const charSpace = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += charSpace.charAt(Math.floor(Math.random() * charSpace.length))
  }
  return text
}

function toQueryString (param) {
  const stringParts = []
  for (const prop in param) {
    // Create each query from params
    stringParts.push(`${encodeURIComponent(prop)}=${encodeURIComponent(param[prop])}`)
  }
  return stringParts.join('&')
}

export default { generateRandomString, toQueryString }
