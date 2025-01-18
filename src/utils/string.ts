/**
 * Converts a word into plural form if appropriate
 * @param str The word to pluralize
 * @param count The count to decide whether to pluralize the word
 * @returns The pluralized word (if count exeeds 1)
 */

export const pluralize = (str: string, count: number) => (count === 1 ? str : `${str}s`)

export const joinArrayWithCommas = (arr: string[]): string => {
  if (arr.length === 0) {
    return ''
  }
  if (arr.length === 1) {
    return arr[0]
  }
  if (arr.length === 2) {
    return arr.join(' and ')
  }
  const lastValue = arr.pop() as string // Remove the last value
  return `${arr.join(', ')}, and ${lastValue}`
}
