import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import { useAdminDatasets } from "~/queries/dataset";

export default function Dataset() {
  const navigate = useNavigate();

  const { data, isLoading } = useAdminDatasets();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 300,
    },
    {
      field: "publisher_data",
      headerName: "Created by",
      width: 300,
      sortComparator: (v1, v2) => {
        const name1 = v1.first_name + " " + v1.last_name;
        const name2 = v2.first_name + " " + v2.last_name;

        return name1.localeCompare(name2);
      },
      renderCell: ({ value }) => {
        return value.type === "individual" ? (
          <Link
            className="hover:text-primary-600 [&>span]:capitalize hover:underline relative z-10"
            to={`/users/${value.id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span>{value.first_name}</span> <span>{value.last_name}</span>
          </Link>
        ) : (
          <span>{"dkd"}</span>
        );
      },
      type: "string",
    },
    {
      field: "views",
      headerName: "Views",
      width: 100,
      valueFormatter: ({ value }) => {
        return value.count;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2.count;
      },
    },
    {
      field: "files_count",
      headerName: "Files",
      width: 100,
      valueFormatter: ({ value }) => {
        return value.count;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2.count;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: ({ value }) => {
        if (value === "pending") {
          return <p className="text-orange-500 font-medium">Pending</p>;
        } else if (value === "published") {
          return <p className="text-green-500 font-medium">Published</p>;
        } else if (value === "rejected") {
          return <p className="text-red-500 font-medium">Rejected</p>;
        } else if (value === "further_review") {
          return <p className="text-info-500 font-medium">Further Review</p>;
        }
      },
      sortable: false,
    },
    {
      field: "created_at",
      headerName: "Created at",
      width: 150,
      valueFormatter: ({ value }) => {
        return moment(value).format("Do MMM, YYYY");
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      type: "string",
    },
    {
      field: "updated_at",
      headerName: "Updated at",
      width: 150,
      valueFormatter: ({ value }) => {
        return moment(value).fromNow();
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      type: "string",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-8 w-full">
        <header className="flex items-center gap-8 justify-between w-full">
          <h1 className="text-2xl largeMobile:text-xl font-semibold">Datasets</h1>
        </header>
        <div className="flex flex-col gap-4">
          <OutlinedInput
            placeholder="Search..."
            className="w-[500px] tablet:w-[80%] [@media(max-width:500px)]:!w-full self-end"
          />
          <div className="min-h-[500px]">
            <DataGrid
              rows={data ? data : []}
              onRowClick={(params) => {
                navigate(`./${params.id}`);
              }}
              loading={isLoading}
              getRowClassName={() => `cursor-pointer`}
              columns={columns}
            />
          </div>
        </div>
      </main>
    </>
  );
}
