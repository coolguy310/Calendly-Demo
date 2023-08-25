import parseFirebaseSnapshotToEntity from "@/common/utils/bookings/utils";
import { db } from "@/firebase";

interface FindUserAlreadyBookedAppointmentServiceProps {
  userId: string;
}

const findUserAlreadyBookedAppointment = async ({
  userId,
}: FindUserAlreadyBookedAppointmentServiceProps) => {
  const snapshot = await db
    .collection("bookings")
    .where("booked_by", "==", userId)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const formattedBookings = parseFirebaseSnapshotToEntity(snapshot);

  return formattedBookings[0] ?? null;
};

export default findUserAlreadyBookedAppointment;
