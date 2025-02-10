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

export const paginateRes = <T>(data: T[], totalRecords: number, page: number, limit: number) => {
  const totalPages = Math.ceil(totalRecords / limit)

  return {
    data,
    paginationInfo: {
      totalRecords,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }
}
