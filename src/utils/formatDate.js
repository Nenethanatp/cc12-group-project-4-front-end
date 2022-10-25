import dateFormat from 'dateformat';

export const formatDate = (dateObj) => {
  const newDate = dateFormat(dateObj, 'HH:MM TT dd-mmm-yy');
  return newDate;
};

export const genStartEndDate = (type) => {
  const monthlyEndDate = () => {
    const today = new Date();
    const startDate = dateFormat(today, 'dd mmm yyyy');

    const genNextNewDate = (fullDate) => {
      const endNextMonth = new Date(
        fullDate.getYear(),
        fullDate.getMonth() + 2,
        0
      );
      if (fullDate.getDate() > endNextMonth.getDate()) {
        return endNextMonth.getDate();
      } else {
        return fullDate.getDate();
      }
    };

    const date = genNextNewDate(today);

    const checkMonth = () => {
      if (today.getMonth !== 11) {
        const endDateFormat = `${today.getFullYear()}-${
          today.getMonth() + 2
        }-${date}`;
        const endDate = dateFormat(new Date(endDateFormat), 'dd mmm yyyy');

        return endDate;
      }
      const endDateFormat = `${today.getFullYear() + 1}-01-${date}`;
      const endDate = dateFormat(new Date(endDateFormat), 'dd mmm yyyy');
      return endDate;
    };
    const endDate = checkMonth();
    return { startDate, endDate };
  };

  const annualyEndDate = () => {
    const today = new Date();
    const startDateFormat = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const startDate = dateFormat(new Date(startDateFormat), 'dd mmm yyyy');

    const endDateFormat = `${today.getFullYear() + 1}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const endDate = dateFormat(new Date(endDateFormat), 'dd mmm yyyy');
    return { startDate, endDate };
  };

  if (type === 'annually') {
    const result = annualyEndDate();
    return result;
  } else {
    const result = monthlyEndDate();
    return result;
  }
};
