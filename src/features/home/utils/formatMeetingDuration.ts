const formatMeetingDuration = (date1: Date, date2: Date) => {
  function minutesDiff(dateTimeValue2: Date, dateTimeValue1: Date) {
    var differenceValue =
      (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
    differenceValue /= 60;
    return Math.abs(Math.round(differenceValue));
  }

  return `${minutesDiff(date1, date2)} minutes`;
};

export default formatMeetingDuration;
