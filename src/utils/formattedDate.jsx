export function useFormatDate(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  if (!inputDate) {
    return
  }

  const dateParts = inputDate.split("-")
  const day = dateParts[2]
  const month = months[Number(dateParts[1]) - 1]
  const year = dateParts[0]

  return `${day} ${month} ${year}`
}
