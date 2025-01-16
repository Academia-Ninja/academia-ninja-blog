function formatDate(
  date,
  locale = "pt-BR",
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}

export { formatDate }
