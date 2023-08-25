import { Calendar } from "@/common/components/ui/calendar";
import ProceedBookingButton from "../../ProceedBookingButton";
import { useEffect, useState } from "react";
import { Booking } from "@/features/home/types";
import fetchBookingsForDate from "@/features/home/utils/fetchBookingsForDate";
import formatAppointmentDateHHmm from "@/features/home/utils/formatAppointmentDateHHmm";
import { useCalendar } from "@/common/hooks/useCalendar";
import { useBookings } from "@/common/hooks/useBookings";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

const ToBookVariation = () => {
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { slots, selectedDate, setSelectedDate } = useCalendar();
  const { selectedSlot, setSelectedSlot } = useBookings();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSlot(null);
    (async () => {
      try {
        setBookingsLoading(true);
        const bookings = await fetchBookingsForDate(selectedDate);

        if (bookings) {
          setBookings(bookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.log("Error on fetching bookings: " + error);
        setBookings([]);
      } finally {
        setBookingsLoading(false);
      }
    })();
  }, [selectedDate]);

  const onSlotClick = (slot: Date) => {
    setSelectedSlot(slot);
  };

  return (
    <div>
      <h1 className="font-bold text-4xl text-center text-yellow-400 mb-8">
        Book a meeting ✨
      </h1>
      <div className="flex justify-center gap-8">
        <div className="w-1/4">
          <Calendar
            onDayClick={(day) => setSelectedDate(day)}
            selected={selectedDate}
          />
        </div>

        <div className="w-1/4">
          <h2 className="text-xl mb-4">Available Times</h2>
          {bookingsLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              {selectedDate ? (
                <ul>
                  {slots.map((slot, index) => {
                    console.log(slot);
                    const displayableSlot = formatAppointmentDateHHmm(slot);

                    return (
                      <li
                        key={slot.getTime()}
                        className="mb-2 flex gap-2 h-[42px]"
                      >
                        <button
                          className="py-2 w-[156px] px-4 bg-blue-500 text-white rounded"
                          onClick={() => onSlotClick(slot)}
                        >
                          {displayableSlot}
                        </button>
                        {selectedSlot === slot && (
                          <ProceedBookingButton slot={slot} />
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>Select a date to book a meeting.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToBookVariation;
