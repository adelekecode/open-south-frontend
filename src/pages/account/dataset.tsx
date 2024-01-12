import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import { useUserDatasets } from "~/queries/dataset";

export default function Dataset() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 10,
      renderCell: ({ api, row }) => {
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1;
      },
    },
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      flex: 1,
      minWidth: 150,
      valueFormatter: ({ value }) => {
        return moment(value).format("Do MMM, YYYY");
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => {
        return moment(value).fromNow();
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "views",
      headerName: "VIEWS",
      flex: 1,
      minWidth: 70,
      valueFormatter: ({ value }) => {
        return value.count;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2.count;
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "files_count",
      headerName: "FILES",
      minWidth: 70,
      valueFormatter: ({ value }) => {
        return value;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2;
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => {
        const obj: {
          element: any;
          styles: string;
        } = {
          element: "-------",
          styles: "py-1 px-2 rounded-full text-xs",
        };

        if (value === "pending") {
          obj.element = (
            <p className={twMerge(obj.styles, `text-orange-500 border border-orange-500`)}>
              Pending
            </p>
          );
        } else if (value === "published") {
          obj.element = (
            <p className={twMerge(obj.styles, `text-green-500 border border-green-500`)}>
              Published
            </p>
          );
        } else if (value === "rejected") {
          obj.element = (
            <p className={twMerge(obj.styles, `text-red-500 border border-red-500`)}>Rejected</p>
          );
        } else if (value === "further_review") {
          obj.element = (
            <p className={twMerge(obj.styles, `text-info-800 border border-info-800`)}>
              Further Review
            </p>
          );
        }

        return obj.element;
      },
      sortable: false,
      minWidth: 130,
      align: "center",
      headerAlign: "center",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { data, isLoading } = useUserDatasets(pageSize, page);

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
              rows={data ? data.results : []}
              loading={isLoading}
              onRowClick={(params) => {
                navigate(`./${params.id}`);
              }}
              getRowClassName={() => `cursor-pointer`}
              columns={columns}
              rowCount={data?.count}
              onPaginationModelChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    page,
                    pageSize,
                  },
                },
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
