import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import DataGrid from "~/components/data-grid";
import { useAdminOrganizations, useAdminOrganizationsIndicators } from "~/queries/organizations";
import { notifySuccess } from "~/utils/toast";
import { useChangeOrganizationStatus } from "~/mutations/organization";
import useOrganizationStore from "~/store/organization";

export default function Organization() {
  const navigate = useNavigate();

  const [statusObj, setStatusObj] = useState<{ [key: string]: Organization["status"] }>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterBy, setFilterBy] = useState<{
    status: Organization["status"] | null;
    isVerified: "true" | "false" | null;
  }>({
    status: null,
    isVerified: null,
  });

  const { setDeleteConfirmationModal } = useOrganizationStore();

  const changeOrganizationStatus = useChangeOrganizationStatus();

  const { data, isLoading } = useAdminOrganizations(pageSize, page);
  const { data: indicatorData } = useAdminOrganizationsIndicators();

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

              if (chosenValue === "pending") {
                return;
              }

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
      headerName: "VERIFIED",
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
                setDeleteConfirmationModal({
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
      <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 flex-wrap p-4 [&>div]:flex [&>div]:items-center [&>div]:gap-3 [&>div]:text-sm [&>div]:border [&>div]:rounded [&>div]:p-2 [&>div]:px-3 [&>div>*]:text-xs">
            <div className="border-orange-500 [&>*]:text-orange-500">
              <p>Pending</p>
              <span>{indicatorData?.pending || 0}</span>
            </div>
            <div className="border-blue-500 [&>*]:text-blue-500">
              <p>Approved</p>
              <span>{indicatorData?.approved || 0}</span>
            </div>
            <div className="border-red-500 [&>*]:text-red-500">
              <p>Rejected</p>
              <span>{indicatorData?.rejected || 0}</span>
            </div>
          </div>
          <div className="flex items-center border-y p-4 py-4 border-info-100">
            <div className="flex items-center gap-4 h-10">
              <OutlinedInput
                placeholder="Search for name..."
                className="w-[300px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
              />
              <Select
                className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                value={filterBy.status || ""}
                onChange={async (e) => {
                  const chosenValue = e.target.value;

                  setFilterBy((prev) => ({
                    ...prev,
                    status: chosenValue as typeof filterBy.status,
                  }));
                }}
                displayEmpty
              >
                <MenuItem value="" className="placeholder">
                  <span className="text-info-600">Select status</span>
                </MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="reject">Rejected</MenuItem>
                <MenuItem value="approve">Approved</MenuItem>
              </Select>
              <Select
                className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                value={filterBy.isVerified || ""}
                onChange={async (e) => {
                  const chosenValue = e.target.value;

                  setFilterBy((prev) => ({
                    ...prev,
                    isVerified: chosenValue as typeof filterBy.isVerified,
                  }));
                }}
                displayEmpty
              >
                <MenuItem value="" className="placeholder">
                  <span className="text-info-600">Select verified</span>
                </MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="min-h-[410px] p-4">
          <DataGrid
            className="!border-info-150"
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
