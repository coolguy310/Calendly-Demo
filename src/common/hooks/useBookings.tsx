import { createContext, useContext, useState } from "react";

import getAllBookings from "@/features/booking/services/getAllBookings";
import findUserAlreadyBookedAppointment from "@/features/booking/services/findUserAlreadyBookedAppointment";
import cancel from "@/features/booking/services/cancel";
import persist from "@/features/booking/services/persist";

import { useAuth } from "./useAuth";
import { FormattedBooking } from "../utils/bookings/utils";
import { useCalendar } from "./useCalendar";

interface BookingsContextValue {
  bookedAppointment: FormattedBooking | null;
  fetchUserBookingState: () => void;
  checkingIfAlreadyBookedAnAppointment: boolean;
  cancelBooking: (userId: string) => Promise<void>;
  persistBooking: (slot: Date) => Promise<void>;
  setSelectedSlot: (slot: Date | null) => void;
  selectedSlot: Date | null;
  fetchAllBookings: () => void;
  bookings: FormattedBooking[];
  isBookingsFetchLoading: boolean;
  userAlreadyBookedAppointment: boolean;
}

const BookingsContext = createContext<BookingsContextValue>(
  {} as BookingsContextValue
);

function add30Minutes(date: Date) {
  return new Date(date.getTime() + 30 * 60 * 1000);
}

const BookingsProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [bookedAppointment, setBookedAppointment] =
    useState<FormattedBooking | null>(null);
  const [
    checkingIfAlreadyBookedAnAppointment,
    setCheckingIfAlreadyBookedAnAppointment,
  ] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<FormattedBooking[]>([]);
  const [isBookingsFetchLoading, setIsBookingsFetchLoading] = useState(false);

  const { currentUser } = useAuth();
  const { setSelectedDate } = useCalendar();

  const fetchUserBookingState = async () => {
    if (!currentUser) return;

    try {
      const alreadyBookedAnAppointment = await findUserAlreadyBookedAppointment(
        { userId: currentUser.id }
      );

      if (alreadyBookedAnAppointment) {
        setBookedAppointment(alreadyBookedAnAppointment);
      }
    } catch (error) {
      console.log("Error on fetching already booked appointment: " + error);
    } finally {
      setCheckingIfAlreadyBookedAnAppointment(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    await cancel({ bookingId });
    setBookedAppointment(null);
  };

  const persistBooking = async (slot: Date) => {
    if (!currentUser)
      throw new Error("Unable to book without being authenticated.");

    const endDate = add30Minutes(slot);

    const booking = await persist({
      userId: currentUser.id,
      initialDate: slot,
      endDate,
      userEmail: currentUser.email,
    });

    setBookedAppointment({
      id: booking.id,
      user_email: currentUser.email,
      start_time: {
        date: slot,
        hours: slot.getHours(),
        minutes: slot.getMinutes(),
      },
      end_time: {
        date: endDate,
        hours: endDate.getHours(),
        minutes: endDate.getMinutes(),
      },
    });

    setSelectedDate(new Date());
  };

  const fetchAllBookings = async () => {
    try {
      setIsBookingsFetchLoading(true);
      const bookings = await getAllBookings();
      setBookings(bookings);
    } catch (error) {
      console.log("Error on fetching bookings: " + error);
    } finally {
      setIsBookingsFetchLoading(false);
    }
  };

  return (
    <BookingsContext.Provider
      value={{
        bookedAppointment,
        fetchAllBookings,
        fetchUserBookingState,
        checkingIfAlreadyBookedAnAppointment,
        cancelBooking,
        persistBooking,
        selectedSlot,
        setSelectedSlot,
        bookings,
        isBookingsFetchLoading,
        userAlreadyBookedAppointment: !!bookedAppointment,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

const useBookings = (): BookingsContextValue => {
  const context = useContext(BookingsContext);

  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }

  return context;
};

export { BookingsProvider, useBookings };
