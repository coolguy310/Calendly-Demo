import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginScreen from "@/features/login";
import SignUpScreen from "@/features/signup";
import AdminScreen from "@/features/admin";
import HomeScreen from "@/features/home";
import ProtectedRoute from "./common/components/auth/ProtectedRoute";
import Template from "./common/components/app/Template";

const Wrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Template displayHeader={true}>
              <LoginScreen />
            </Template>
          }
        />
        <Route
          path="/signup"
          element={
            <Template displayHeader={true}>
              <SignUpScreen />
            </Template>
          }
        />
        <Route
          path="/admin"
          element={
            <Template displayHeader={false}>
              <AdminScreen />
            </Template>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Template displayHeader={true}>
                <HomeScreen />
              </Template>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Wrapper;
