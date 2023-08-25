import { INTLDateDisplayOptionsDDMMYYYY } from "../types";

const formatAppointmentDate = (date: Date, timeZone?: string) => {
  const defaultTimezoneForFormatting =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  const INTLDateDisplayOptions: INTLDateDisplayOptionsDDMMYYYY = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: timeZone ?? defaultTimezoneForFormatting,
  };

  const displayableDate = new Intl.DateTimeFormat(
    "en-US",
    INTLDateDisplayOptions
  ).format(new Date(date));

  return displayableDate;
};

export default formatAppointmentDate;
