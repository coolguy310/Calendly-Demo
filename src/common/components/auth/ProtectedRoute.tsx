import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/common/hooks/useAuth";
import LoadingSpinner from "../app/LoadingSpinner";

const ProtectedRoute = ({ children: children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = React.useContext(AuthContext);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
