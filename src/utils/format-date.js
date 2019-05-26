const shouldPrependWithZero = item => {
  return item.toString().length === 1 ? '0' + item : item
}

export default item => {
  if (!item) return ''

  const date = new Date(item)
  const day = shouldPrependWithZero(date.getDay())
  const month = shouldPrependWithZero(date.getMonth() + 1)

  return `${date.getFullYear()}`
}
