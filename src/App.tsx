import { Routes, Route } from "react-router-dom";
import RouteGuard from "./component/RouteGaurd";
// import Login from "./pages/Register/Login";
// import AdminPanel from "./pages/Authentication/AdminUser";
import UserData from "./pages/Authentication/UserData";

interface Route {
  path: string;
  element: React.ReactNode;
  isPublic?: boolean;
  allowedRole?: "admin" | "user";
}

const appRoutes: Route[] = [
  // {
  //   path: "/",
  //   element: <Login />,
  //   isPublic: true,
  // },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   isPublic: true,
  // },
  // {
  //   path: "/admin",
  //   element: <AdminPanel />,
  //   allowedRole: "admin",
  // },
  {
    path: "/",
    element: <UserData />,
    allowedRole: "user",
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      {appRoutes.map(({ path, element, isPublic, allowedRole }) => (
        <Route
          key={path}
          path={path}
          element={
            <RouteGuard isPublic={isPublic} allowedRole={allowedRole}>
              {element}
            </RouteGuard>
          }
        />
      ))}
    </Routes>
  );
}
