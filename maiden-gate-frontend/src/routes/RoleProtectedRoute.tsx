import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

type RoleProtectedRouteProps = {
  allowedRole: "master" | "player";
};

export default function RoleProtectedRoute({
  allowedRole,
}: RoleProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.type !== allowedRole) {
    return (
      <Navigate
        to={user.type === "master" ? "/dashboard/master" : "/dashboard/player"}
        replace
      />
    );
  }

  return <Outlet />;
}
