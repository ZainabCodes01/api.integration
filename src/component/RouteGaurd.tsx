import { Navigate } from "react-router-dom";

interface RouteProps {
  children: React.ReactNode;
  allowedRole?: "admin" | "user";
  isPublic?: boolean;
}

export default function RouteGuard({ children, isPublic }: RouteProps) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  if (isPublic) {
    if (isLoggedIn) {
      return <Navigate to={role === "admin" ? "/admin" : "/userdata"} replace />;
    }
    return children;
  }


  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (allowedRole && role !== allowedRole) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
}