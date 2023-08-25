import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

interface InternalEntity {
  id: string;
  data: DocumentData;
}

export interface FormattedBooking {
  id: string;
  user_email: string;
  start_time: {
    hours: number;
    minutes: number;
    date: Date;
  };
  end_time: {
    hours: number;
    minutes: number;
    date: Date;
  };
}

const parseFirebaseSnapshotToEntity = (snapshot: any) => {
  const bookings = snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      return {
        id: doc.id,
        data: doc.data(),
      };
    }
  );

  const formattedBookings: FormattedBooking[] = bookings.map(
    (booking: InternalEntity) => {
      return {
        id: booking.id,
        user_email: booking.data.user_email,
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
    }
  );

  return formattedBookings;
};

export default parseFirebaseSnapshotToEntity;
