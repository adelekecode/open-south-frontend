import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppLoader from "~/components/loader/app-loader";
import { useCurrentUser } from "~/queries/user";

export default function Protected() {
  const { data, isLoading } = useCurrentUser();

  const { pathname } = useLocation();

  if (isLoading) {
    return <AppLoader />;
  }

  if (!data) {
    return (
      <Navigate
        to="/login"
        state={{
          from: pathname,
        }}
      />
    );
  }

  return <Outlet />;
}
