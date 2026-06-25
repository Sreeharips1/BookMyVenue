export const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");

  const h = Number(hour);

  const suffix = h >= 12 ? "PM" : "AM";

  const formattedHour = h % 12 === 0 ? 12 : h % 12;

  return `${formattedHour}:${minute} ${suffix}`;
};
