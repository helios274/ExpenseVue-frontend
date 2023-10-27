export default function formatCurrency(
  number,
  currencyCode = "USD",
  locale = "en-US"
) {
  const formattedCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(number);

  return formattedCurrency;
}
