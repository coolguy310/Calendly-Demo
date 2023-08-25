import parseFirebaseSnapshotToEntity, {
  FormattedBooking,
} from "@/common/utils/bookings/utils";
import { db } from "@/firebase";

const getAllBookings: () => Promise<FormattedBooking[]> = async () => {
  const bookings = await db.collection("bookings").get();

  const formattedBookings = parseFirebaseSnapshotToEntity(bookings);

  return formattedBookings;
};

export default getAllBookings;
