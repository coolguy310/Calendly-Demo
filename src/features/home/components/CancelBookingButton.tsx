import { Loader2 } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/ui/alert-dialog";
import { Button } from "@/common/components/ui/button";
import { toast } from "@/common/components/ui/use-toast";
import { useBookings } from "@/common/hooks/useBookings";

// TODO: Move to utils
function isDifferenceMoreThan24Hours(date1: Date, date2: Date) {
  const difference = Math.abs(date1.getTime() - date2.getTime());
  const oneDay = 24 * 60 * 60 * 1000;

  return difference > oneDay;
}

export function CancelBookingButton() {
  const [displayConfirmationDialog, setDisplayConfirmationDialog] =
    useState(false);
  const [isCancelationLoading, setIsCancelationLoading] = useState(false);
  const { cancelBooking, bookedAppointment } = useBookings();

  if (!bookedAppointment) return null;

  const canCancel = isDifferenceMoreThan24Hours(
    bookedAppointment.start_time.date,
    new Date()
  );

  const onContinueButtonPress = async () => {
    setDisplayConfirmationDialog(false);
    try {
      if (!bookedAppointment) return;

      setIsCancelationLoading(true);

      await cancelBooking(bookedAppointment.id);

      toast({
        title: "Success",
        description: "Appointment sucessfully canceled.",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsCancelationLoading(false);
      setDisplayConfirmationDialog(false);
    }
  };

  const onCancelButtonPress = () => {
    setDisplayConfirmationDialog(true);
  };

  return (
    <div className="flex flex-col items-center">
      <AlertDialog open={displayConfirmationDialog}>
        <AlertDialogTrigger asChild onClick={onCancelButtonPress}>
          <Button
            variant="destructive"
            className="w-32"
            disabled={!canCancel || isCancelationLoading}
          >
            {!isCancelationLoading ? (
              <span>Cancel</span>
            ) : (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking cancellation</AlertDialogTitle>
            <AlertDialogDescription>
              Your booking will be canceled, and you will need to make a new booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onContinueButtonPress}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {!canCancel && (
        <span className="mt-2 opacity-40">
          You can only cancel appointments when it's more than 24h before the
          event.
        </span>
      )}
    </div>
  );
}

export default CancelBookingButton;
