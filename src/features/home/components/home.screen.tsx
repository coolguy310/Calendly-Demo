import { useEffect } from "react";
import "firebase/firestore";
import { Loader2 } from "lucide-react";

import { useBookings } from "@/common/hooks/useBookings";
import { useAuth } from "@/common/hooks/useAuth";

import BookedVariation from "./variations/booked";
import ToBookVariation from "./variations/to-book";

function BookingPage() {
  const { currentUser } = useAuth();
  const {
    fetchUserBookingState,
    userAlreadyBookedAppointment,
    fetchAllBookings,
    checkingIfAlreadyBookedAnAppointment,
  } = useBookings();

  if (!currentUser) return null;

  useEffect(() => {
    fetchUserBookingState();
    fetchAllBookings();
  }, []);

  return (
    <>
      {checkingIfAlreadyBookedAnAppointment ? (
        <div className="center-spinner">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
        </div>
      ) : (
        <>
          {userAlreadyBookedAppointment ? (
            <BookedVariation />
          ) : (
            <ToBookVariation />
          )}
        </>
      )}
    </>
  );
}

export default BookingPage;
