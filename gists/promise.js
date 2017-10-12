const toUpper = async string => {
  if (string === 'invalid') {
    // there are multiple ways to do this instead of Promise.reject()
    return Promise.reject(Error('Invalid input'))
  }
  // Redundant Promise.resolve() because async functions always return Promises
  return Promise.resolve(string.toUpperCase())
}

const errorHandler = () => {
  console.log('There has been an error. I\'ll handle it.')
}

const print = console.log

// Works normally.
toUpper('gunar').then(print, errorHandler)
// "GUNAR"

// Business Logic Error gets handled by errorHandler().
toUpper('invalid').then(print, errorHandler)
// "There has been an error. I'll handle it."

// Runtime Exceptions ALSO get handled by errorHandler().
toUpper(555555).then(print, errorHandler)
// "There has been an error. I'll handle it."
