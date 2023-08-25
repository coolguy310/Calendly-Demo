import { db } from "@/firebase";

async function fetchBookingsForDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  try {
    const snapshot = await db
      .collection("bookings")
      .where("year", "==", year)
      .where("month", "==", month + 1)
      .where("day", "==", day)
      .get();

    if (snapshot.empty) {
      console.log("No bookings found for the specified month.");
      return;
    }

    const bookings = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data(),
      };
    });

    const formattedBookings = bookings.map((booking) => {
      return {
        id: booking.id,
        start_time: {
          hours: booking.data.start_time.toDate().getHours(),
          minutes: booking.data.start_time.toDate().getMinutes(),
          date: booking.data.start_time.toDate(),
        },
        end_time: {
          hours: booking.data.end_time.toDate().getHours(),
          minutes: booking.data.end_time.toDate().getMinutes(),
          date: booking.data.end_time.toDate(),
        },
      };
    });

    return formattedBookings;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
  }
}

export default fetchBookingsForDate;
