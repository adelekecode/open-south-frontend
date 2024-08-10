import { Outlet, useParams } from "react-router-dom";
import DashboardLoader from "~/components/loader/dashboard-loader";
import NotFound from "~/pages/404";
import { useUserOrganizationDetails } from "~/queries/organizations";

export default function UserOrganization() {
  const { slug } = useParams();

  const { data, isLoading } = useUserOrganizationDetails(slug || "");

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!isLoading && !data) {
    return <NotFound />;
  }

  if (!data.is_verified) {
    return <NotFound />;
  }

  if (data.status === "pending" || data.status === "rejected") {
    return <NotFound />;
  }

  return <Outlet />;
}
