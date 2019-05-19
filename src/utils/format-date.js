const shouldPrependWithZero = item => {
  return item.toString().length === 1 ? '0' + item : item
}

export default date => {
  const day = shouldPrependWithZero(date.getDay())
  const month = shouldPrependWithZero(date.getMonth() + 1)

  return `${day}-${month}-${date.getFullYear()}`
}
