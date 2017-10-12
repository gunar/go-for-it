'use strict'

// According to You Don't Know JavaScript
// https://github.com/getify/You-Dont-Know-JS/blob/31e1d4ff600d88cc2ce243903ab8a3a9d15cce15/types%20%26%20grammar/ch3.md#date-and-error
const nativeExceptions = [
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
]

function go(promise) {
  return promise
    .then(data => [undefined, data])
    .catch(err => {
      for (const Exception of nativeExceptions) {
        if (typeof Exception === 'function' &&
            err instanceof Exception) {
          throw err
        }
      }
      return [err, undefined]
    })
}

module.exports = go
