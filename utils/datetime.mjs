export const getSQLSupportedDateTime = (date) => {
  return getFormattedDate(date) + " " + date.toTimeString().split(" ")[0];
};

const getFormattedDate = (date) => {
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
};
