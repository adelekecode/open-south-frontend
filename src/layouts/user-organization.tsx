import { Outlet, useParams } from "react-router-dom";
import DashboardLoader from "~/components/loader/dashboard-loader";
import NotFound from "~/pages/404";
import { useOrganizationDetails } from "~/queries/organizations";

export default function UserOrganization() {
  const { slug } = useParams();

  const { data, isLoading } = useOrganizationDetails(slug || "");

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!isLoading && !data) {
    return <NotFound />;
  }

  if (!data.is_verified) {
    return <NotFound />;
  }

  return <Outlet />;
}
