import { Outlet, useParams } from "react-router-dom";
import DashboardLoader from "~/components/loader/dashboard-loader";
import NotFound from "~/pages/404";
import { useDatasetDetails } from "~/queries/dataset";

export default function GetUserDataset() {
  const { id } = useParams();
  const { data, isLoading } = useDatasetDetails(id || "");

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!data) {
    return <NotFound />;
  }

  return <Outlet />;
}
