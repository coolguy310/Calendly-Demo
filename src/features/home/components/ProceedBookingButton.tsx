import { useState } from "react";
import { Loader2 } from "lucide-react";

import { INTLDateDisplayOptions } from "../types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import { toast } from "@/common/components/ui/use-toast";
import { useAuth } from "@/common/hooks/useAuth";
import { Button } from "@/common/components/ui/button";
import { useBookings } from "@/common/hooks/useBookings";

function ProceedBookingButton({ slot }: { slot: Date }) {
  const [isBookingBeingScheduled, setIsBookingBeingScheduled] = useState(false);

  const { currentUser } = useAuth();
  const { persistBooking, selectedSlot } = useBookings();

  if (!currentUser || !selectedSlot) return null;

  const INTLDateDisplayOptions: INTLDateDisplayOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const displayableDate = new Intl.DateTimeFormat(
    "en-US",
    INTLDateDisplayOptions
  ).format(new Date(slot));

  const handleOnConfirmBookingButtonClick = async () => {
    try {
      setIsBookingBeingScheduled(true);
      await persistBooking(selectedSlot);
      toast({
        title: "Successfully booked",
        description: "Your appoint is booked for " + displayableDate,
      });
    } catch (error) {
      toast({
        title: "Booking failed",
        description:
          "There was an error booking your appointment, please try again later.",
        variant: "destructive",
      });
      console.log("Error on scheduling booking: " + error);
    } finally {
      setIsBookingBeingScheduled(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 transition-all ease-in-out text-white font-bold rounded animate-in pop-animation">
          Next
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Booking confirmation</DialogTitle>
          <DialogDescription>
            Please confirm the informations regarding your booking:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span>
            <b>Your email:</b> <span>{currentUser?.email}</span>
          </span>
          <span>
            <b>Date:</b> <span>{displayableDate}</span>
          </span>
        </div>
        <DialogFooter className="flex justify-start">
          <Button
            disabled={isBookingBeingScheduled}
            type="submit"
            className="bg-yellow-500 font-bold self-start w-24"
            onClick={() => handleOnConfirmBookingButtonClick()}
          >
            {isBookingBeingScheduled ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProceedBookingButton;
