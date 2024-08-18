import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { IoCloudDownloadOutline, IoGridOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import DataGrid from "~/components/data-grid";
import Button from "~/components/button";
import { useUserOrganizationDatasets } from "~/queries/dataset";
import MostAccessedDatasets from "./most-accessed-datasets";
import TopTrafficLocations from "./top-traffic-locations";
import {
  createColumn,
  createDatasetStatusColumn,
  createDateColumn,
  createIdColumn,
} from "~/utils/table-helpers";

export default function Dashboard() {
  const { t } = useTranslation("dashboard-layout/account/organization/dashboard");

  const { slug } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const organization = queryClient.getQueryData<Organization>([`/organisations/${slug}/`]);
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  const columns: GridColDef[] = [
    createIdColumn(
      {
        page: 0,
        pageSize: 10,
      },
      {
        headerName: t("latest-dataset-created.table.header.no"),
      }
    ),
    createColumn({
      field: "views",
      minWidth: 100,
      headerName: t("latest-dataset-created.table.header.views"),
    }),
    createColumn({
      field: "files_count",
      headerName: t("latest-dataset-created.table.header.files"),
      minWidth: 100,
    }),
    createDateColumn({
      field: "created_at",
      headerName: t("latest-dataset-created.table.header.created-at"),
    }),
    createDateColumn({
      field: "updated_at",
      headerName: t("latest-dataset-created.table.header.updated-at"),
    }),
    createDatasetStatusColumn({
      field: "status",
      headerName: t("latest-dataset-created.table.header.status"),
    }),
  ];

  const { data: datasets, isLoading: isDatasetsLoading } = useUserOrganizationDatasets({
    orgId: organization?.id || "",
    searchParams: {
      search: "",
      status: "",
      limit: "10",
      offset: "0",
    },
  });

  return (
    <>
      <main className="p-6 px-8 pb-12 tablet:px-6 largeMobile:!px-4 gap-4 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium flex items-center gap-2">
            <span className="text-info-800 capitalize">{organization?.name || "-----"}</span>
            <span className="text-sm">{">"}</span> <span className="text-sm">{t("title")}</span>
          </h1>
          {currentUser?.id === organization?.user && (
            <Button
              className="!py-2 !px-3 !text-xs"
              variant="outlined"
              onClick={() => {
                navigate(`/account/${slug}/edit`);
              }}
            >
              Edit
            </Button>
          )}
        </div>
        <div className="w-full border border-info-100 bg-white p-4 rounded-md">
          <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:650px)]:!grid-cols-1 gap-4   [&>div]:w-full [&>div]:rounded-md [&>div]:p-4 [&>div]:flex [&>div]:justify-between [&>div]:min-h-[9rem]   [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:mt-2 [&>div>div]:gap-3   [&>div>div>p]:font-semibold [&>div>div>p]:text-sm [&>div>div>h1]:text-4xl [&>div>div>h1]:font-semibold">
            <div className="bg-red-50">
              <div>
                <p className="text-info-950">Datasets</p>
                <h1 className="text-neutral-800">{`${organization?.data_count ?? "--"}`}</h1>
              </div>
              <span className="p-2 border border-red-500 h-fit rounded text-red-500 text-base">
                <IoGridOutline />
              </span>
            </div>
            <div className="bg-purple-50">
              <div>
                <p className="text-info-950">Views</p>
                <h1 className="text-neutral-800">{organization?.views_count ?? "--"}</h1>
              </div>
              <span className="p-2 border border-purple-500 h-fit rounded text-purple-500 text-base">
                <AiOutlineEye />
              </span>
            </div>
            <div className="bg-lime-50">
              <div>
                <p className="text-info-950">Downloads</p>
                <h1 className="text-neutral-800">{`${organization?.downloads_count ?? "--"}`}</h1>
              </div>
              <span className="p-2 border border-lime-500 h-fit rounded text-lime-500 text-base">
                <IoCloudDownloadOutline />
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 tablet:grid-cols-1">
          <MostAccessedDatasets />
          <TopTrafficLocations />
        </div>
        <div className="w-full border border-info-100 bg-white p-4 rounded-md flex flex-col gap-4 py-5 pt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold text-info-950">Latest dataset created</h1>
            <div>
              <Button
                className="!py-2 !px-3 !text-xs"
                variant="outlined"
                onClick={() => {
                  navigate(`/account/${organization?.slug}/datasets`);
                }}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="min-h-[500px]">
            <DataGrid
              rows={datasets?.results || []}
              loading={isDatasetsLoading}
              onRowClick={(params) => {
                navigate(`/account/${organization?.slug}/datasets/${params.id}`);
              }}
              getRowClassName={() => `cursor-pointer`}
              columns={columns}
              hideFooter
            />
          </div>
        </div>
      </main>
    </>
  );
}
