# go-for-it

[![CircleCI](https://circleci.com/gh/gunar/go-for-it.svg?style=svg)](https://circleci.com/gh/gunar/go-for-it)

Error handling à la golang.

Read the blog post
> [Async Control Flow without Exceptions nor Monads](https://medium.com/@gunar/async-control-flow-without-exceptions-nor-monads-b19af2acc553)


## Installation
```
npm install go-for-it
```

## Example

```js
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
```

## License

MIT [http://gunar.mit-license.org]()
