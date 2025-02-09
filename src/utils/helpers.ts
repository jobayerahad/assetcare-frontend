export const capWords = (str: string, exceptions: string[] = []) => {
  const exceptionSet = new Set(exceptions.map((ex) => ex.toUpperCase()))

  return str
    ?.toLowerCase()
    .split(' ')
    .map((word) => {
      const upperWord = word.toUpperCase()
      return exceptionSet.has(upperWord) ? upperWord : word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
