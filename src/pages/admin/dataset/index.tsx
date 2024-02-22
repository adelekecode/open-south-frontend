import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ClickAwayListener,
  Fade,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Popper,
  Select,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { GoKebabHorizontal } from "react-icons/go";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import { useAdminDatasets } from "~/queries/dataset";
import DeleteConfirmationModal from "./delete-confirmation";
import PublishConfirmationModal from "./status-confirmation-modals/publish";
import RejectConfirmationModal from "./status-confirmation-modals/reject";
import UnpublishConfirmationModal from "./status-confirmation-modals/unpublish";
import FurtherReviewConfirmationModal from "./status-confirmation-modals/further-review";
import useDebounce from "~/hooks/debounce";

type Modal = {
  open: boolean;
  data: Dataset | null;
};

type QueryKey = "q" | "status";

export default function Dataset() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = {
    get: (key: QueryKey) => searchParams.get(key) || "",
    delete: (key: QueryKey) => {
      setSearchParams((params) => {
        params.delete(key);

        return params;
      });
    },
    set: (key: QueryKey, value: string) => {
      setSearchParams(
        (params) => {
          params.set(key, value);

          return params;
        },
        {
          replace: true,
        }
      );
    },
  };

  const [anchorElObj, setAnchorElObj] = useState<{ [key: string]: HTMLButtonElement | null }>({});
  const [statusObj, setStatusObj] = useState<{ [key: string]: Dataset["status"] }>({});
  const [publishModal, setPublishModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [rejectModal, setRejectModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [unpublishModal, setUnpublishModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [furtherReviewModal, setFurtherReviewModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState<Modal>({
    open: false,
    data: null,
  });

  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  function dropdownDisplay(id: string) {
    return Boolean(anchorElObj[id]);
  }

  const { data, isLoading } = useAdminDatasets(
    useDebounce(queryParams.get("q")).trim(),
    {
      status: queryParams.get("status"),
    },
    {
      ...pagination,
    }
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 10,
      renderCell: ({ api, row }) => {
        const { page, pageSize } = pagination;
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1 + page * pageSize;
      },
    },
    {
      field: "title",
      headerName: "TITLE",
      minWidth: 300,
      headerClassName: "font-bold",
      flex: 1,
    },
    {
      field: "publisher_data",
      headerName: "CREATED BY",
      minWidth: 250,
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
          <Link
            className="hover:text-primary-600 [&>span]:capitalize hover:underline relative z-10"
            to={`/organizations/${value.slug}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span>{value.name}</span>
          </Link>
        );
      },
      flex: 1,
      type: "string",
    },
    {
      field: "views",
      headerName: "VIEWS",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => {
        return value.count;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2.count;
      },
    },
    {
      field: "files_count",
      headerName: "FILES",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => {
        return value;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2;
      },
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 180,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ value, row }) => {
        return (
          <Select
            className="w-full !text-[0.85rem] !py-0 !px-0"
            value={statusObj[row.id] || value}
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
              }
            }}
          >
            <MenuItem value="pending" className="!hidden">
              Pending
            </MenuItem>
            <MenuItem
              value="unpublished"
              className={`${value === "unpublished" || (value === "pending" && "!hidden")}`}
              onClick={() => {
                setUnpublishModal({
                  open: true,
                  data: row,
                });
              }}
            >
              Unpublished
            </MenuItem>
            <MenuItem
              value="published"
              className={`${value === "published" && "!hidden"}`}
              onClick={() => {
                setPublishModal({
                  open: true,
                  data: row,
                });
              }}
            >
              Published
            </MenuItem>
            <MenuItem
              value="rejected"
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
              value="further_review"
              onClick={() => {
                setFurtherReviewModal({
                  open: true,
                  data: row,
                });
              }}
            >
              Further Review
            </MenuItem>
          </Select>
        );
      },
      sortable: false,
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      minWidth: 180,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => {
        return moment(value).format("Do MMM, YYYY");
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      flex: 1,
      type: "string",
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => {
        const date = moment(value).fromNow();

        return date.charAt(0).toUpperCase() + date.slice(1);
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
      type: "string",
    },
    {
      field: "_",
      headerName: "ACTION",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: ({ row }) => {
        const obj = anchorElObj[row.id];

        return (
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
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorElObj((prev) => ({
                    ...prev,
                    [row.id]: obj ? null : e.currentTarget,
                  }));
                }}
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
        );
      },
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold largeMobile:text-xl">Datasets</h1>
        </div>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex items-center border-y p-4 py-4 border-info-100">
            <div className="flex items-center gap-4 h-10 w-full">
              <OutlinedInput
                placeholder="Search for title..."
                value={queryParams.get("q")}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!value) {
                    return queryParams.delete("q");
                  }

                  queryParams.set("q", value);
                }}
                className="w-[400px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
              />
              <Select
                className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                value={queryParams.get("status")}
                onChange={async (e) => {
                  const chosenValue = e.target.value;

                  if (!chosenValue) {
                    return queryParams.delete("status");
                  }

                  queryParams.set("status", chosenValue);
                }}
                displayEmpty
              >
                <MenuItem value="" className="placeholder">
                  <span className="text-info-600">Filter by status</span>
                </MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="unpublished">Unpublished</MenuItem>
                <MenuItem value="further_review">Further Review</MenuItem>
              </Select>
            </div>
          </div>
          <div className="min-h-[500px] p-4">
            <DataGrid
              rows={data ? data.results : []}
              onRowClick={(params) => {
                navigate(`./${params.id}`);
              }}
              loading={isLoading}
              getRowClassName={() => `cursor-pointer`}
              columns={columns}
              rowCount={data?.count || 0}
              paginationModel={pagination}
              onPaginationModelChange={({ page, pageSize }, { reason }) => {
                if (!reason) return;

                setPagination({
                  page,
                  pageSize,
                });
              }}
              paginationMode="server"
            />
          </div>
        </div>
      </main>
      <PublishConfirmationModal
        open={publishModal.open}
        onClose={() => {
          setPublishModal({
            open: false,
            data: null,
          });
        }}
        data={publishModal.data as Dataset}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            status: queryParams.get("status"),
          },
        }}
      />
      <RejectConfirmationModal
        open={rejectModal.open}
        onClose={() => {
          setRejectModal({
            open: false,
            data: null,
          });
        }}
        data={rejectModal.data as Dataset}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            status: queryParams.get("status"),
          },
        }}
      />
      <UnpublishConfirmationModal
        open={unpublishModal.open}
        onClose={() => {
          setUnpublishModal({
            open: false,
            data: null,
          });
        }}
        data={unpublishModal.data as Dataset}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            status: queryParams.get("status"),
          },
        }}
      />
      <FurtherReviewConfirmationModal
        open={furtherReviewModal.open}
        onClose={() => {
          setFurtherReviewModal({
            open: false,
            data: null,
          });
        }}
        data={furtherReviewModal.data as Dataset}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            status: queryParams.get("status"),
          },
        }}
      />
      <DeleteConfirmationModal
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({
            open: false,
            data: null,
          });
        }}
        data={deleteModal.data as Dataset}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            status: queryParams.get("status"),
          },
        }}
      />
    </>
  );
}
