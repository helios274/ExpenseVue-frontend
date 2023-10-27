export default function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = inputDate.split("-");
  const monthAbbreviation = months[parseInt(month, 10) - 1];

  return `${day} ${monthAbbreviation}, ${year}`;
}
