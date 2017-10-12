const toUpper = (string, cb) => {
  if (string === 'invalid') return cb(Error('Invalid input'))
  return cb(null, string.toUpperCase())
}

const errorHandler = () => {
  console.log('There has been an error. I\'ll handle it.')
}

const print = (err, value) => {
  if (err) return errorHandler(err)
  console.log(value)
}

// Works normally.
toUpper('gunar', print)
// "GUNAR"

// Business Logic Error gets handled by errorHandler().
toUpper('invalid', print)
// "There has been an error. I'll handle it."

// Runtime Exceptions don't get handled by errorHandler(),
try {
  toUpper(555555, print)
} catch (e) {
  // but can be caught by try/catch.
  console.log(e)
  // TypeError: string.toUpperCase is not a function
}
