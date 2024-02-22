import { Navigate, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import OrganizationVerificationModal from "~/components/organization/verification-modal";
import OrganizationPendingModal from "~/components/organization/pending-modal";
import OrganizationRejectedModal from "~/components/organization/rejected-modal";
import DashboardLayout from "./dashboard";

export default function UserRestricted() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  if (currentUser?.role === "admin") {
    return <Navigate to="/404" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
      <OrganizationVerificationModal />
      <OrganizationPendingModal />
      <OrganizationRejectedModal />
    </DashboardLayout>
  );
}
