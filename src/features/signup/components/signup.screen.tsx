"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { useToast } from "@/common/components/ui/use-toast";
import { useAuth } from "@/common/hooks/useAuth";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp, isLoggedIn } = useAuth();

  if (isLoggedIn) {
    navigate("/home");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      await signUp({ email: data.email, password: data.password });
      toast({
        title: "Successfully registered.",
      });
      navigate("/home");
      navigate(0);
    } catch (error) {
      toast({
        title:
          "An error occured during your registration. Please check your credentials.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        margin: "0 auto",
      }}
    >
      <h1 className="font-bold text-4xl">Create a new account</h1>
      <span className="">
        or <Link to="/">Log in</Link>
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[400px] mt-0"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Create account</Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUpPage;
