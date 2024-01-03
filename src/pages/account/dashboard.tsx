import { useNavigate } from "react-router-dom";
import { GridColDef, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { SiAwsorganizations } from "react-icons/si";
import { IoGridOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import data from "~/utils/data/dataset.json";
import Button from "~/components/button";

export default function Dashboard() {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 400,
    },
    { field: "createdAt", headerName: "Created at", flex: 1, minWidth: 130 },
    {
      field: "updatedAt",
      headerName: "Updated at",
      flex: 1,
      valueFormatter: (params) => {
        return moment(params.value).fromNow();
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      type: "string",
      minWidth: 130,
    },
    {
      field: "views",
      headerName: "Views",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, typeof data>) => {
        return (params.id as number) % 2 === 0 ? (
          <p className="text-orange-500 font-medium">Pending</p>
        ) : (
          <p className="text-green-500 font-medium">Published</p>
        );
      },
      sortable: false,
      minWidth: 130,
    },
  ];

  return (
    <>
      <main className="p-6 px-8 pb-12 tablet:px-6 largeMobile:!px-4 gap-4 flex flex-col">
        <header className="flex items-center gap-8 justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>
        <div className="w-full border border-info-100 bg-white p-4 rounded-md">
          <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:650px)]:!grid-cols-1 gap-4   [&>div]:w-full [&>div]:rounded-md [&>div]:p-4 [&>div]:flex [&>div]:justify-between [&>div]:min-h-[9rem]   [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:mt-2 [&>div>div]:gap-3   [&>div>div>p]:font-semibold [&>div>div>p]:text-sm [&>div>div>h1]:text-4xl [&>div>div>h1]:font-semibold">
            <div className="bg-red-50">
              <div>
                <p className="text-info-950">Datasets</p>
                <h1 className="text-neutral-800">{"92,345"}</h1>
              </div>
              <span className="p-2 border border-red-500 h-fit rounded text-red-500 text-base">
                <IoGridOutline />
              </span>
            </div>
            <div className="bg-blue-50">
              <div>
                <p className="text-info-950">Organizations</p>
                <h1 className="text-neutral-800">{"92,345"}</h1>
              </div>
              <span className="p-2 border border-blue-500 h-fit rounded text-blue-500 text-base">
                <SiAwsorganizations />
              </span>
            </div>
            <div className="bg-purple-50">
              <div>
                <p className="text-info-950">Views</p>
                <h1 className="text-neutral-800">{"92,345"}</h1>
              </div>
              <span className="p-2 border border-purple-500 h-fit rounded text-purple-500 text-base">
                <AiOutlineEye />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full border border-info-100 bg-white p-4 rounded-md mt-6 flex flex-col gap-4 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold text-info-950">Latest dataset created</h1>
            <div>
              <Button
                className="!py-2 !px-3 !text-xs"
                variant="outlined"
                onClick={() => {
                  navigate("/account/datasets");
                }}
              >
                View All
              </Button>
            </div>
          </div>
          <DataGrid
            rows={data.slice(0, 10).map((item, index) => {
              const { title, updatedAt } = item;

              return {
                id: index + 1,
                title,
                createdAt: moment(Date.now()).format("Do MMM, YYYY"),
                updatedAt,
                views: Math.floor(Math.random() * 1000) + 1,
              };
            })}
            onRowClick={(params: GridRowParams<(typeof data)[0]>) => {
              navigate(`/account/datasets/${params.id}`);
            }}
            getRowClassName={() => `cursor-pointer`}
            columns={columns}
            hideFooter
          />
        </div>
      </main>
    </>
  );
}
