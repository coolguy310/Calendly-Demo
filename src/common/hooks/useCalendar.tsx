import { createContext, useContext, useEffect, useState } from "react";

interface CalendarContextValue {
  slots: Array<Date>;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const CalendarContext = createContext<CalendarContextValue>(
  {} as CalendarContextValue
);

function generateTimeSlotsForPST({
  date,
  intervalInMinutes = 30,
}: {
  date: Date;
  intervalInMinutes?: number;
}) {
  const dates = [];

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();

  const interval = intervalInMinutes * 60 * 1000;

  const startTime = new Date(currentYear, currentMonth, currentDay, 9, 0, 0);
  const endTime = new Date(currentYear, currentMonth, currentDay, 15, 0, 0); // 3 PM

  if (new Date(date) < new Date(Date.now())) {
    return [];
  }

  for (
    let current = startTime;
    current <= endTime;
    current = new Date(current.getTime() + interval)
  ) {
    dates.push(
      new Date(
        current.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
      )
    );
  }

  const validDates = dates.filter(
    (date) => date.getTime() > new Date().getTime()
  );

  return validDates;
}

const CalendarProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [slots, setSlots] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setSlots(generateTimeSlotsForPST({ date: selectedDate }));
  }, [selectedDate]);

  return (
    <CalendarContext.Provider
      value={{
        slots,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

const useCalendar = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }

  return context;
};

export { CalendarProvider, useCalendar };
