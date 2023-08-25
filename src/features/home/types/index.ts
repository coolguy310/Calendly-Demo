type DateTypeEnum = "numeric" | "2-digit" | undefined;

export interface INTLDateDisplayOptions {
  year: DateTypeEnum;
  month: DateTypeEnum;
  day: DateTypeEnum;
  hour: DateTypeEnum;
  minute: DateTypeEnum;
  hour12: boolean;
  timeZone: string;
}

export interface INTLDateDisplayOptionsDDMMYYYY {
  year: DateTypeEnum;
  month: DateTypeEnum;
  day: DateTypeEnum;
  timeZone: string;
}

export interface INTLDateDisplayOptionsHHmm {
  hour: DateTypeEnum;
  minute: DateTypeEnum;
  hour12: boolean;
  timeZone: string;
}

export interface Booking {
  id: string;
  booked_by?: string;
  start_time: {
    hours: string;
    minutes: string;
    date: Date;
  };
  end_time: {
    hours: string;
    minutes: string;
    date: Date;
  };
}
