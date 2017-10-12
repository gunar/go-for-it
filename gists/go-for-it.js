'use strict'

const go = require('go-for-it')

const toUpper = async string => {
  if (string === 'invalid') throw Error('Invalid input')
  return string.toUpperCase()
}
const errorHandler = () => { console.log('There has been an error. I\'ll handle it.') }
const print = console.log

const foo = async input => {
  const [err, value] = await go(toUpper(input))
  if (err) return errorHandler(err)
  print(value)
}

// Works normally.
foo('gunar')
// "GUNAR"

// Business Logic Error gets handled by errorHandler().
foo('invalid')
// "There has been an error. I'll handle it."

// Runtime Exceptions DO NOT get handled by errorHandler(),
foo(555555).catch(e => {
  // but can be caught.
  console.log(e)
  // TypeError: string.toUpperCase is not a function
})
