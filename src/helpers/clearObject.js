// Required mainly because the Marvel API does not accept empty parameters in the request
export default obj => {
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(prop => {
    if (obj[prop] === '' || obj[prop] === null) {
      delete obj[prop]
    }
  })
}