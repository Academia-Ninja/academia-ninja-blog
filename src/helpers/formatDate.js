function formatDate(
  date,
  locale = "pt-BR",
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}

export { formatDate }
