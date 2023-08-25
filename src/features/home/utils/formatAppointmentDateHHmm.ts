import { INTLDateDisplayOptionsHHmm } from "../types";

const formatAppointmentDateHHmm = (date: Date, timeZone?: string) => {
  const defaultTimezoneForFormatting =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  const INTLDateDisplayOptions: INTLDateDisplayOptionsHHmm = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: timeZone ?? defaultTimezoneForFormatting,
  };

  const displayableDate = new Intl.DateTimeFormat(
    "en-US",
    INTLDateDisplayOptions
  ).format(new Date(date));

  return displayableDate;
};

export default formatAppointmentDateHHmm;
