import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/Authcontext";

export function Protuctroute({ children }) {
  const { user, loading } = useContext(AuthContext);

  console.log(user, loading);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/user-login" replace />;
  }

  return children;
}