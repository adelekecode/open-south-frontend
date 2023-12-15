import { useNavigate } from "react-router-dom";
import { GridColDef, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import moment from "moment";
import DatesetIllustration from "~/assets/illustrations/dashboard-cards/dataset.png";
import ViewsIllustration from "~/assets/illustrations/dashboard-cards/views.png";
import DataGrid from "~/components/data-grid";
import data from "~/utils/data/dataset.json";

export default function Dashboard() {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 300,
    },
    { field: "createdAt", headerName: "Created at", width: 150 },
    {
      field: "updatedAt",
      headerName: "Updated at",
      width: 150,
      valueFormatter: (params) => {
        return moment(params.value).fromNow();
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      type: "string",
    },
    {
      field: "views",
      headerName: "Views",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: GridRenderCellParams<any, typeof data>) => {
        return (params.id as number) % 2 === 0 ? (
          <p className="text-orange-500 font-medium">Pending</p>
        ) : (
          <p className="text-green-500 font-medium">Published</p>
        );
      },
      sortable: false,
    },
  ];

  return (
    <>
      <main className="p-6 px-8 pb-12 tablet:px-6 largeMobile:!px-4">
        <h1 className="text-2xl font-semibold">
          Dashboard <span className="text-sm italic text-info-800">/Netflix</span>
        </h1>
        <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:650px)]:!grid-cols-1 gap-4 py-8   [&>div]:shadow [&>div]:w-full [&>div]:rounded-md [&>div]:p-4 [&>div]:flex [&>div]:aspect-video [&>div]:max-h-[16rem] [&>div]:flex-col [&>div]:relative [&>div]:overflow-hidden  [&>div>p]:text-white [&>div>p]:font-medium  [&>div>h1]:text-4xl [&>div>h1]:font-semibold [&>div>h1]:text-white [&>div>h1]:flex-grow [&>div>h1]:flex [&>div>h1]:items-center [&>div>h1]:break-all  [&>div>img]:w-[55%] [&>div>img]:absolute [&>div>img]:right-[6px] [&>div>img]:top-[7px]">
          <div className="bg-red-500/95">
            <p>Datasets</p>
            <img src={DatesetIllustration} className="opacity-30" alt="dataset illustration" />
            <h1>{"23,445"}</h1>
          </div>
          <div className="bg-purple-500/80">
            <p>Views</p>
            <img className="opacity-30" src={ViewsIllustration} alt="views illustration" />
            <h1 className="relative z-[2]">{"423,498"}</h1>
          </div>
        </div>
        <div className="pt-4">
          <h1 className="text-xl font-semibold p-4">Latest dataset created</h1>
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
              navigate(`./${params.id}`);
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
