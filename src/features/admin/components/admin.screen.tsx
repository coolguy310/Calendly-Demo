import { useEffect, useState } from "react";

import { useBookings } from "@/common/hooks/useBookings";
import formatAppointmentDate from "@/features/home/utils/formatAppointmentDate";
import formatAppointmentDateHHmm from "@/features/home/utils/formatAppointmentDateHHmm";
import formatMeetingDuration from "@/features/home/utils/formatMeetingDuration";
import LoadingSpinner from "@/common/components/app/LoadingSpinner";
import { Input } from "@/common/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/common/components/ui/form";
import { toast } from "@/common/components/ui/use-toast";

const FormSchema = z.object({
  password: z.string(),
});

const PASSWORD = import.meta.env.VITE_ADMIN_DASHBOARD_PASSWORD || 12345678;

const Admin = () => {
  const { bookings, isBookingsFetchLoading, fetchAllBookings } = useBookings();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onFormSubmit = (data: z.infer<typeof FormSchema>) => {
    if (data.password === PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Sucessfully authenticated as admin.",
      });
      return;
    }

    toast({
      title: "Authentication failed",
      description: "Wrong credentials.",
      variant: "destructive",
    });
  };

  if (!isAuthenticated)
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="space-y-4 mt-0 flex flex-col text-xl items-center text-start"
        >
          <b>Password</b>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>
    );

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="max-w-64">
        <div className="text-center">
          <h1 className="font-bold text-4xl text-center text-yellow-400 mb-2">
            Admin Panel
          </h1>
          <span className="text-center font-semibold text-purple-800">
            Bookings list (PST)
          </span>
        </div>
        <div>
          {isBookingsFetchLoading ? (
            <div className="flex w-full justify-center my-4">
              <LoadingSpinner />
            </div>
          ) : (
            <ul>
              {bookings.map((booking) => (
                <li className="p-3 border mt-4 rounded-md" key={booking.id}>
                  <div>
                    <b>User: </b>
                    <span>{booking.user_email}</span>
                  </div>
                  <div>
                    <b>Date: </b>
                    <span>
                      {formatAppointmentDate(
                        booking.start_time.date,
                        "America/Los_Angeles"
                      )}
                    </span>
                  </div>
                  <div>
                    <b>Time slot: </b>
                    <span>
                      {formatAppointmentDateHHmm(
                        booking.start_time.date,
                        "America/Los_Angeles"
                      )}{" "}
                      -{" "}
                      {formatAppointmentDateHHmm(
                        booking.end_time.date,
                        "America/Los_Angeles"
                      )}
                    </span>
                  </div>
                  <div>
                    <b>Duration: </b>
                    <span>
                      {formatMeetingDuration(
                        booking.start_time.date,
                        booking.end_time.date
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
