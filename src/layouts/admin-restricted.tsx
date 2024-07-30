import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "./dashboard";
import DashboardLoader from "~/components/loader/dashboard-loader";

export default function AdminRestricted() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  if (currentUser?.role === "user") {
    return <Navigate to="/404" replace />;
  }

  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardLoader />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}
