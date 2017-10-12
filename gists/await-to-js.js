'use strict'

// await-to-js
const to = promise =>
  promise
    .then(data => [undefined, data])
    .catch(err => [err, undefined])

const toUpper = async string => {
  if (string === 'invalid') throw Error('Invalid input')
  return string.toUpperCase()
}
const errorHandler = () => { console.log('There has been an error. I\'ll handle it.') }
const print = console.log

const foo = async input => {
  const [err, value] = await to(toUpper(input))
  if (err) return errorHandler(err)
  print(value)
}

// Works normally.
foo('gunar')
// "GUNAR"

// Business Logic Error gets handled by errorHandler().
foo('invalid')
// "There has been an error. I'll handle it."

// Runtime Exceptions ALSO get handled by errorHandler().
foo(555555)
// "There has been an error. I'll handle it."
