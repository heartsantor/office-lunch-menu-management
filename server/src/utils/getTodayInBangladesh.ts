export const getTodayInBangladesh = () => {
  const now = new Date();
  const bangladeshTime = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  return bangladeshTime;
};
