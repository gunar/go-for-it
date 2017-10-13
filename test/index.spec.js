'use strict'

const assert = require('assert')

const go = require('../src')

describe('go', () => {
  it('should catch custom errors', async () => {
    const fn = async () => {
      throw Error('custom error')
    }

    const [err, result] = await go(fn())

    assert(err)
    assert(! result)
  })

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
  for (const Exception of nativeExceptions) {
    it(`should let ${Exception.name} pass through`, async () => {
      const fn = async () => {
        throw Exception()
      }

      try {
        await go(fn())
      } catch (e) {
        assert(e instanceof Exception)
        return
      }

      throw Error('should have thrown')
    })
  }

  it('should throw on natively-issued ReferenceErrors', async () => {
    const fn = async () => {
      x = 5 // eslint-disable-line no-undef
    }

    try {
      await go(fn())
    } catch (e) {
      assert(e instanceof ReferenceError)
      return
    }

    throw Error('should have thrown')
  })
})
