"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useContext, useState } from "react";

import { auth } from "@/firebase";

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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/common/hooks/useAuth";
import { toast } from "@/common/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/home");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      await login({
        email: data.email,
        password: data.password,
      });
      navigate("/home");
      toast({
        title: "Successfully authenticated 🤩",
      });
    } catch (error) {
      console.log(444);
      toast({
        title: "Login failed",
        description: "An error occured during your login",
        variant: "destructive",
      });
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
      <h1 className="font-bold text-4xl">Log in</h1>
      <span>
        or <Link to="/signup">Sign up</Link>
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
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
