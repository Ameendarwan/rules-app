import { it, describe, expect } from 'vitest'
import { pluralize, joinArrayWithCommas } from './string'

describe('String Utils', () => {
  it('pluralize() returns the original word when count is 1', () => {
    const word = 'Test'
    const count = 1
    const value = pluralize(word, count)
    expect(value).toEqual(word)
  })

  it('pluralize() returns the plural word when count is > 1', () => {
    const word = 'Test'
    const count = 2
    const value = pluralize(word, count)
    expect(value).toEqual(`${word}s`)
  })

  it('pluralize() returns the plural word when count is 0', () => {
    const word = 'Test'
    const count = 0
    const value = pluralize(word, count)
    expect(value).toEqual(`${word}s`)
  })

  it('should join an array of 3 elements with commas and "and"', () => {
    const fruits = ['Apple', 'Mango', 'Banana']
    const result = joinArrayWithCommas(fruits)
    expect(result).toBe('Apple, Mango, and Banana')
  })

  it('should join an array of 2 elements with "and"', () => {
    const fruits = ['Mango', 'Banana']
    const result = joinArrayWithCommas(fruits)
    expect(result).toBe('Mango and Banana')
  })

  it('should return the single element as is', () => {
    const fruits = ['Apple']
    const result = joinArrayWithCommas(fruits)
    expect(result).toBe('Apple')
  })

  it('should return an empty string for an empty array', () => {
    const fruits: string[] = []
    const result = joinArrayWithCommas(fruits)
    expect(result).toBe('')
  })
})
