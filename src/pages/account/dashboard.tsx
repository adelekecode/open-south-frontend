import { Link, useNavigate } from "react-router-dom";
import { GridColDef, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { FaAngleDown } from "react-icons/fa6";
import moment from "moment";
import Button from "~/components/button";
import DataGrid from "~/components/data-grid";
import data from "~/utils/data/dataset.json";
import DatesetIllustration from "~/assets/illustrations/dataset.png";
import OrganizationIllustration from "~/assets/illustrations/organization.png";

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
      field: "createdBy",
      headerName: "Created by",
      width: 300,
      valueGetter: (params) => {
        const { organization, user } = params.row;

        return organization ? organization.name : `${user.firstName} ${user.lastName}`;
      },
      renderCell: (params: GridRenderCellParams<any, typeof data>) => {
        const { organization, user } = params.row;

        return organization ? (
          <Link
            className="text-primary-600 capitalize hover:underline relative z-10"
            to={`/organizations/${organization.slug}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {organization.name}
          </Link>
        ) : user ? (
          <span className="capitalize">{`${user.firstName} ${user.lastName}`}</span>
        ) : (
          "-------"
        );
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
      <main className="p-6 px-8 pb-12">
        <header className="flex items-center gap-8 justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button className="!rounded !py-0 !px-0">
            <p className="text-white border-r p-6 py-2">Add</p>
            <FaAngleDown className="mx-2" />
          </Button>
        </header>
        <div className="flex items-center gap-8 py-8">
          <div className="shadow w-[300px] rounded-md bg-red-500 aspect-video p-4 flex flex-col relative overflow-hidden">
            <p className="text-white font-medium">Datasets</p>
            <h1 className="text-4xl font-semibold text-white flex-grow flex items-center break-all">
              {"0"}
            </h1>
            <img
              className={`w-[150px] absolute right-[10px] top-[7px] opacity-50`}
              src={DatesetIllustration}
              alt="dataset illustration"
            />
          </div>
          <div className="shadow w-[300px] rounded-md bg-yellow-500 aspect-video p-4 flex flex-col relative overflow-hidden">
            <p className="text-white font-medium">Organizations</p>
            <h1 className="text-4xl font-semibold text-white flex-grow flex items-center break-all">
              {"0"}
            </h1>
            <img
              className={`w-[114px] absolute right-[15px] top-[33px] opacity-50`}
              src={OrganizationIllustration}
              alt="organizations illustration"
            />
          </div>
        </div>
        <div className="pt-4">
          <h1 className="text-xl font-semibold p-4">Latest dataset created</h1>
          <DataGrid
            rows={data.slice(0, 10).map((item, index) => {
              const { title, organization, user, updatedAt } = item;

              return {
                id: index + 1,
                title,
                createdAt: moment(Date.now()).format("Do MMM, YYYY"),
                updatedAt,
                organization,
                user,
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
