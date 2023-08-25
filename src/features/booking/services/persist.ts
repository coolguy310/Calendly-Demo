import { db } from "@/firebase";
import { Timestamp } from "firebase/firestore";

interface PersistBookingProps {
  userId: string;
  initialDate: Date;
  endDate: Date;
  userEmail: string;
}

const persistBooking = async ({
  initialDate,
  endDate,
  userId,
  userEmail,
}: PersistBookingProps) => {
  const newBooking = {
    booked_by: userId,
    day: initialDate.getDate(),
    month: initialDate.getMonth() + 1,
    year: initialDate.getFullYear(),
    start_time: Timestamp.fromDate(initialDate),
    end_time: Timestamp.fromDate(endDate),
    user_email: userEmail,
  };

  const booking = await db.collection("bookings").add(newBooking);

  return booking;
};

export default persistBooking;
