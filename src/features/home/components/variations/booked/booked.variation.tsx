import { useAuth } from "@/common/hooks/useAuth";
import formatAppointmentDate from "../../../utils/formatAppointmentDate";
import formatAppointmentDateHHmm from "../../../utils/formatAppointmentDateHHmm";
import formatMeetingDuration from "../../../utils/formatMeetingDuration";
import CancelBookingButton from "../../CancelBookingButton";
import { useBookings } from "@/common/hooks/useBookings";
import { Button } from "@/common/components/ui/button";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

function isDifferenceMoreThanOneWeek(date1: Date, date2: Date) {
  const difference = Math.abs(date1.getTime() - date2.getTime());
  const oneDay = 24 * 60 * 60 * 1000 * 7;
  return difference > oneDay;
}

const BookedVariation = () => {
  const { currentUser } = useAuth();
  const { cancelBooking, userAlreadyBookedAppointment, bookedAppointment } =
    useBookings();

  if (!currentUser || !userAlreadyBookedAppointment || !bookedAppointment)
    return null;

  const moreThanOneWeekAfterAppointment = isDifferenceMoreThanOneWeek(
    bookedAppointment?.start_time.date,
    new Date()
  );

  const meetingStartTimeHasPassed =
    new Date().getTime() > bookedAppointment.start_time.date.getTime();

  const onBookingPassedReturnButtonClick = () => {
    cancelBooking(bookedAppointment.id);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="max-w-64">
        {meetingStartTimeHasPassed ? (
          <div className="flex flex-col">
            <h1 className="font-bold text-center text-4xl text-center text-yellow-400 mb-2">
              The start time has passed!
            </h1>
            <span className="text-center font-semibold text-purple-800">
              Looks like you missed the meeting!
            </span>
            <span className="text-center font-semibold text-purple-800">
              {moreThanOneWeekAfterAppointment
                ? "Since have been more than a week after your appointment, you can go and schedule another one."
                : "You will be able to make another booking in one week from now."}
            </span>
            {!moreThanOneWeekAfterAppointment && (
              <span className="text-center font-semibold text-purple-800">
                If this is an mistake and you made the call, please press the
                button below.
              </span>
            )}
            <Button
              className="w-48 mt-2 self-center font-semibold"
              onClick={onBookingPassedReturnButtonClick}
            >
              Return
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="font-bold text-4xl text-center text-yellow-400 mb-2">
                You're set!
              </h1>
              <span className="text-center font-semibold text-purple-800">
                You have successfully booked an appointment, and here are the details:
              </span>
            </div>
            <div className="flex flex-col mt-4 gap-1 text-center w-full">
              <span>
                <b className="">Your email: </b>
                <span className="font-extrabold text-yellow-500">
                  {currentUser.email}
                </span>
              </span>
              <span>
                <b className="">Appointment date: </b>
                <span className="font-extrabold text-yellow-500">
                  {formatAppointmentDate(bookedAppointment.start_time.date)}
                </span>
              </span>
              <span>
                <b className="">Time slot: </b>
                <span className="font-extrabold text-yellow-500">
                  {`${formatAppointmentDateHHmm(
                    bookedAppointment.start_time.date
                  )} - ${formatAppointmentDateHHmm(
                    bookedAppointment.end_time.date
                  )}`}
                </span>
              </span>
              <span>
                <b className="">Duration: </b>
                <span className="font-extrabold text-yellow-500">
                  {formatMeetingDuration(
                    bookedAppointment.start_time.date,
                    bookedAppointment.end_time.date
                  )}
                </span>
              </span>
            </div>
            <div className="flex w-full justify-center items-center mt-4">
              <CancelBookingButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookedVariation;
