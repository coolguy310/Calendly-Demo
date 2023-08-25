import "./setup";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BookingsProvider } from "@/common/hooks/useBookings.tsx";
import { AuthProvider } from "@/common/hooks/useAuth";
import { CalendarProvider } from "@/common/hooks/useCalendar.tsx";
import { Toaster } from "@/common/components/ui/toaster.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CalendarProvider>
        <BookingsProvider>
          <App />
        </BookingsProvider>
      </CalendarProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
