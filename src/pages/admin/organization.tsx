import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import DataGrid from "~/components/data-grid";
import { useAdminOrganizations } from "~/queries/organizations";
import { notifySuccess } from "~/utils/toast";
import { useChangeOrganizationStatus } from "~/mutations/organization";
import useOrganizationStore from "~/store/organization";

export default function Organization() {
  const navigate = useNavigate();

  const [statusObj, setStatusObj] = useState<{ [key: string]: Organization["status"] }>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { setOrganizationDeleteConfirmationModal } = useOrganizationStore();

  const changeOrganizationStatus = useChangeOrganizationStatus();

  const { data, isLoading } = useAdminOrganizations(pageSize, page);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 10,
      maxWidth: 70,
      renderCell: ({ api, row }) => {
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1;
      },
    },
    {
      field: "logo_url",
      headerName: "",
      minWidth: 110,
      renderCell: (params) => {
        return (
          <Avatar className="mx-auto !bg-transparent">
            <img
              src={params.value}
              alt="organization picture"
              className="w-full h-full object-contain"
            />
          </Avatar>
        );
      },
      editable: false,
      filterable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "data_count",
      headerName: "DATASETS",
      minWidth: 150,
      valueFormatter: ({ value }) => {
        return value;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2;
      },
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "views_count",
      headerName: "VIEWS",
      minWidth: 150,
      valueFormatter: ({ value }) => {
        return value;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2;
      },
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "downloads_count",
      headerName: "DOWNLOADS",
      minWidth: 150,
      valueFormatter: ({ value }) => {
        return value;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2;
      },
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 180,
      renderCell: ({ value, row }) => {
        const newValue = value === "approved" ? "approve" : value === "rejected" ? "reject" : value;
        const val = statusObj[row.id] || newValue;

        return (
          <Select
            className="w-full !text-[0.85rem] !py-0 !px-0"
            value={val}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={async (e) => {
              const chosenValue = e.target.value;

              if (chosenValue && chosenValue !== statusObj[row.id]) {
                setStatusObj((prevStatusObj) => ({
                  ...prevStatusObj,
                  [row.id]: chosenValue as Dataset["status"],
                }));

                const response = await changeOrganizationStatus.mutateAsync({
                  id: row.id,
                  action: chosenValue as Dataset["status"],
                });

                if (response) {
                  notifySuccess("Organization status has been changed");
                }
              }
            }}
          >
            <MenuItem value="pending" className="!hidden">
              Pending
            </MenuItem>
            <MenuItem value="reject">Rejected</MenuItem>
            <MenuItem value="approve">Approved</MenuItem>
          </Select>
        );
      },
      sortable: false,
      align: "center",
      headerAlign: "center",
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
        const result = moment(value).fromNow();

        if (result === "a day ago") {
          return "Yesterday";
        }

        return result;
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "is_verified",
      headerName: "IS VERIFIED",
      minWidth: 10,
      renderCell: ({ value }) => {
        const obj: {
          element: any;
          styles: string;
        } = {
          element: "-------",
          styles: "py-1 px-2 rounded-full text-xs",
        };

        if (value === true) {
          obj.element = (
            <p className={twMerge(obj.styles, `text-green-500 border border-green-500`)}>True</p>
          );
        } else if (value === false) {
          obj.element = (
            <p className={twMerge(obj.styles, `text-amber-500 border border-amber-500`)}>False</p>
          );
        }

        return obj.element;
      },
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "_",
      headerName: "ACTION",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <div>
            <IconButton
              size="medium"
              onClick={() => {
                navigate(`./${row.id}`);
              }}
            >
              <IoEyeOutline className="text-lg" />
            </IconButton>
            <IconButton
              size="medium"
              onClick={() => {
                setOrganizationDeleteConfirmationModal({
                  open: true,
                  data: row,
                });
              }}
            >
              <MdOutlineDelete className="text-lg" />
            </IconButton>
          </div>
        );
      },
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold largeMobile:text-xl">Organization</h1>
      </div>
      <div className="bg-white w-full border border-info-100 p-6 rounded-md flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm border rounded p-2 px-3 border-orange-500 [&>*]:text-orange-500">
              <p>Pending</p>
              <span>{10}</span>
            </div>
            <div className="flex items-center gap-3 text-sm border rounded p-2 px-3 border-green-500 [&>*]:text-green-500">
              <p>Approved</p>
              <span>{0}</span>
            </div>
            <div className="flex items-center gap-3 text-sm border rounded p-2 px-3 border-red-500 [&>*]:text-red-500">
              <p>Rejected</p>
              <span>{0}</span>
            </div>
          </div>
          <OutlinedInput
            placeholder="Search..."
            className="w-[400px] tablet:w-[80%] [@media(max-width:500px)]:!w-full self-end"
          />
        </div>
        <div className="min-h-[410px]">
          <DataGrid
            rows={data ? data.results : []}
            loading={isLoading}
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
  );
}
