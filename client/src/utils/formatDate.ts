export function formatDate(dateString: string): string {
  // Create a new Date object with the provided date string
  const dateObject: Date = new Date(dateString);

  // Get the month name, day, and year from the date object
  const monthNames: string[] = [
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
  ];
  const monthIndex: number = dateObject.getUTCMonth();
  const day: number = dateObject.getUTCDate();
  const year: number = dateObject.getUTCFullYear();

  // Construct the formatted date string
  const formattedDate: string = `${monthNames[monthIndex]} ${day}, ${year}`;

  return formattedDate;
}
