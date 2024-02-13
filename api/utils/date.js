export function dateDiff(date1, date2, interval) {
  var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;
  date1 = new Date(date1);
  date2 = new Date(date2);
  var timediff = date2 - date1;
  if (isNaN(timediff)) return NaN;
  switch (interval) {
    case "years":
      return date2.getFullYear() - date1.getFullYear();
    case "months":
      return (
        date2.getFullYear() * 12 +
        date2.getMonth() -
        (date1.getFullYear() * 12 + date1.getMonth())
      );
    case "weeks":
      return Math.floor(timediff / week);
    case "days":
      return Math.floor(timediff / day);
    case "hours":
      return Math.floor(timediff / hour);
    case "minutes":
      return Math.floor(timediff / minute);
    case "seconds":
      return Math.floor(timediff / second);
    default:
      return undefined;
  }
}

export function dateConverterDMYtoYMD(value) {
  let dateArray = value.split("/");
  return new Date(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`);
}

export function getOnlyDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + "-" + month + "-" + day;
}
