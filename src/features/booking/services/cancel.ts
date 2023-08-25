import { db } from "@/firebase";

interface CancelBookingProps {
  bookingId: string;
}

const cancel = async ({ bookingId }: CancelBookingProps) => {
  await db.collection("bookings").doc(bookingId).delete();
};

export default cancel;
