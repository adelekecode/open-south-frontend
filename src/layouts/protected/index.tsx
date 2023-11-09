import { Navigate, Outlet, useLocation } from "react-router-dom";
import DashboardLoader from "~/components/loader/dashboard-loader";
import { useCurrentUser } from "~/queries/user";

export default function Protected() {
  const { data, isLoading } = useCurrentUser();

  const { pathname } = useLocation();

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!data) {
    return (
      <Navigate
        to="/login/d"
        state={{
          from: pathname,
        }}
      />
    );
  }

  return <Outlet />;
}
