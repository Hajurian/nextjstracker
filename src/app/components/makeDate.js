export function makeDate() {
  let today = new Date();
  return `${today.getFullYear()}-${
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`
  }-${today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`}`;
}

//returns true if more than one day away, returns false if only one day apart
export function compareDate(prevDate, date) {
  let prevDateArr = prevDate.split("-");
  let dateArr = date.split("-");
  //year check
  if (
    Math.abs(parseInt(prevDateArr[0]) - parseInt(dateArr[0])) > 0 ||
    Math.abs(parseInt(prevDateArr[1]) - parseInt(dateArr[1])) > 0
  ) {
    return true;
  }
  if (Math.abs(parseInt(prevDateArr[2]) - parseInt(dateArr[2])) > 1) {
    return true;
  }
  return false;
}
