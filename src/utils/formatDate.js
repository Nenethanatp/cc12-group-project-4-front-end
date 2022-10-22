import dateFormat from 'dateformat';

export const formatDate = (dateObj) => {
  const newDate = dateFormat(dateObj, 'HH:MM TT dd-mmm-yy');
  return newDate;
};
