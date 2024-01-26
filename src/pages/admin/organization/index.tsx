import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  ClickAwayListener,
  Fade,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Popper,
  Select,
  Tooltip,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import DataGrid from "~/components/data-grid";
import { useAdminOrganizations, useAdminOrganizationsIndicators } from "~/queries/organizations";
import ApproveConfirmationModal from "./status-confirmation-modals/approve";
import RejectConfirmationModal from "./status-confirmation-modals/reject";
import BlockConfirmationModal from "./active-confirmation-modals/block";
import UnblockConfirmationModal from "./active-confirmation-modals/unblock";
import DeleteConfirmationModal from "./delete-confirmation";
import { GoKebabHorizontal } from "react-icons/go";
import useAdminOrganizationStore from "~/store/admin-organization";

type Modal = {
  open: boolean;
  data: Organization | null;
};

export default function Organization() {
  const navigate = useNavigate();

  const { pagination, setPagination } = useAdminOrganizationStore();
  const { page, pageSize } = pagination;

  const [statusObj, setStatusObj] = useState<{ [key: string]: Organization["status"] }>({});
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [filterBy, setFilterBy] = useState<{
    status: "reject" | "approve" | "block" | "unblock" | "delete" | null;
    isVerified: "true" | "false" | null;
    isActive: "true" | "false" | null;
  }>({
    status: null,
    isVerified: null,
    isActive: null,
  });
  const [approveModal, setApproveModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [rejectModal, setRejectModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [blockModal, setBlockModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [unblockModal, setUnblockModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [anchorElObj, setAnchorElObj] = useState<{ [key: string]: HTMLButtonElement | null }>({});

  function dropdownDisplay(id: string) {
    return Boolean(anchorElObj[id]);
  }

  const { data: indicatorData } = useAdminOrganizationsIndicators();
  const { data, isLoading } = useAdminOrganizations(filterBy, {
    page,
    pageSize,
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 100,
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
      minWidth: 180,
      flex: 1,
      renderCell: ({ value, row }) => {
        const newValue = value === "approved" ? "approve" : value === "rejected" ? "reject" : value;
        const val = statusObj[row.id] || newValue;

        return (
          <Tooltip title={!row.is_verified && "Organization not verified"}>
            <Select
              className="w-[180px] !text-[0.85rem] !py-0 !px-0"
              value={val}
              disabled={!row.is_verified}
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
                }
              }}
            >
              <MenuItem value="pending" className="!hidden">
                Pending
              </MenuItem>
              <MenuItem
                value="reject"
                onClick={() => {
                  setRejectModal({
                    open: true,
                    data: row,
                  });
                }}
              >
                Rejected
              </MenuItem>
              <MenuItem
                value="approve"
                onClick={() => {
                  setApproveModal({
                    open: true,
                    data: row,
                  });
                }}
              >
                Approved
              </MenuItem>
            </Select>
          </Tooltip>
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
      minWidth: 200,
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
      minWidth: 200,
      flex: 1,
      valueFormatter: ({ value }) => {
        const result = moment(value).fromNow();

        if (result === "a day ago") {
          return "Yesterday";
        }

        return result.charAt(0).toUpperCase() + result.slice(1);
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
      minWidth: 100,
      flex: 1,
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
      field: "is_active",
      headerName: "ACTIVE",
      minWidth: 100,
      flex: 1,
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
      width: 100,
      renderCell: ({ row }) => {
        const obj = anchorElObj[row.id];

        return (
          <>
            <ClickAwayListener
              onClickAway={() =>
                setAnchorElObj((prev) => ({
                  ...prev,
                  [row.id]: null,
                }))
              }
            >
              <div>
                <IconButton
                  size="small"
                  onClick={(e) =>
                    setAnchorElObj((prev) => ({
                      ...prev,
                      [row.id]: obj ? null : e.currentTarget,
                    }))
                  }
                >
                  <GoKebabHorizontal className="rotate-90" />
                </IconButton>
                <Popper transition open={dropdownDisplay(row.id)} anchorEl={obj} className="!mt-2">
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Paper className="flex flex-col [&>button]:p-4 [&>button]:text-xs [&>button]:py-3 overflow-hidden relative divide-y !shadow">
                        <button
                          className="hover:bg-info-100"
                          onClick={() => {
                            navigate(`./${row.id}`);
                            setAnchorElObj((prev) => ({
                              ...prev,
                              [row.id]: null,
                            }));
                          }}
                        >
                          View
                        </button>
                        <button
                          className="hover:bg-info-100"
                          onClick={async () => {
                            if (row.is_active) {
                              setBlockModal({
                                open: true,
                                data: row,
                              });
                            } else {
                              setUnblockModal({
                                open: true,
                                data: row,
                              });
                            }

                            setAnchorElObj((prev) => ({
                              ...prev,
                              [row.id]: null,
                            }));
                          }}
                        >
                          {row.is_active ? "Block" : "Unblock"}
                        </button>
                        <button
                          className="hover:bg-info-100"
                          onClick={() => {
                            setDeleteModal({
                              open: true,
                              data: row,
                            });

                            setAnchorElObj((prev) => ({
                              ...prev,
                              [row.id]: null,
                            }));
                          }}
                        >
                          Delete
                        </button>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </div>
            </ClickAwayListener>
          </>
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
    <>
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
              <div className="flex items-center gap-4 h-10 w-full">
                <OutlinedInput
                  placeholder="Search for name..."
                  className="w-[400px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
                />
              </div>
            </div>
            <div className="flex w-full items-center border-b p-4 py-4 border-info-100">
              <div className="flex w-full items-center justify-end gap-4 h-10">
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
                    <span className="text-info-600">Filter by status</span>
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
                    <span className="text-info-600">Filter by verified</span>
                  </MenuItem>
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
                <Select
                  className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                  value={filterBy.isActive || ""}
                  onChange={async (e) => {
                    const chosenValue = e.target.value;

                    setFilterBy((prev) => ({
                      ...prev,
                      isActive: chosenValue as typeof filterBy.isActive,
                    }));
                  }}
                  displayEmpty
                >
                  <MenuItem value="" className="placeholder">
                    <span className="text-info-600">Filter by active</span>
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
                setPagination({
                  page,
                  pageSize,
                });
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    page: !data?.count || data.count <= 0 ? 0 : page,
                    pageSize,
                  },
                },
              }}
            />
          </div>
        </div>
      </main>
      <ApproveConfirmationModal
        open={approveModal.open}
        onClose={() => {
          setApproveModal({
            open: false,
            data: null,
          });
        }}
        data={approveModal.data as Organization}
      />
      <RejectConfirmationModal
        open={rejectModal.open}
        onClose={() => {
          setRejectModal({
            open: false,
            data: null,
          });
        }}
        data={rejectModal.data as Organization}
      />
      <BlockConfirmationModal
        open={blockModal.open}
        onClose={() => {
          setBlockModal({
            open: false,
            data: null,
          });
        }}
        data={blockModal.data as Organization}
      />
      <UnblockConfirmationModal
        open={unblockModal.open}
        onClose={() => {
          setUnblockModal({
            open: false,
            data: null,
          });
        }}
        data={unblockModal.data as Organization}
      />
      <DeleteConfirmationModal
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({
            open: false,
            data: null,
          });
        }}
        data={deleteModal.data as Organization}
      />
    </>
  );
}
