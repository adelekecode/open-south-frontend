import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoPerson } from "react-icons/io5";
import { GoKebabHorizontal } from "react-icons/go";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import DataGrid from "~/components/data-grid";
import { useGetAllUsers } from "~/queries/user";
import BlockConfirmationModal from "./confirmation-modals/block";
import DeleteConfirmationModal from "./confirmation-modals/delete";
import UnblockConfirmationModal from "./confirmation-modals/unblock";
import useDebounce from "~/hooks/debounce";

type Modal = {
  open: boolean;
  data: CurrentUser | null;
};

type QueryKey = "q" | "is-active";

export default function User() {
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
  const [blockModal, setBlockModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [unblockModal, setUnblockModal] = useState<Modal>({
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

  const { isLoading, data } = useGetAllUsers(
    useDebounce(queryParams.get("q")).trim(),
    {
      isActive: queryParams.get("is-active"),
    },
    pagination
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 100,
      renderCell: ({ api, row }) => {
        const { page, pageSize } = pagination;
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1 + page * pageSize;
      },
    },
    {
      field: "image_url",
      headerName: "",
      minWidth: 40,
      renderCell: (params) => {
        return (
          <Avatar sx={{ width: 40, height: 40 }} className="mx-auto">
            {params.value ? (
              <img
                src={params.value}
                alt="profile picture"
                className="w-full h-full object-cover"
              />
            ) : (
              <IoPerson className={"text-base"} />
            )}
          </Avatar>
        );
      },
      editable: false,
      filterable: false,
      sortable: false,
    },
    {
      field: "first_name",
      headerName: "First Name",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "capitalize",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "capitalize",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      type: "string",
      renderCell: (params) => {
        return (
          <a
            className="hover:underline hover:text-primary-600 text-center whitespace-nowrap"
            href={`mailto:${params.value}`}
          >
            {params.value}
          </a>
        );
      },
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date_joined",
      headerName: "Date Joined",
      minWidth: 150,
      type: "string",
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
      flex: 1,
      headerAlign: "center",
      align: "center",
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
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
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
                    <Paper className="flex flex-col [&>button]:p-4 [&>button]:text-sm [&>button]:py-3 overflow-hidden relative divide-y !shadow">
                      <button
                        className="hover:bg-info-100"
                        onClick={() => {
                          navigate(`/users/${row.id}`);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="hover:bg-info-100"
                        onClick={(e) => {
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
                            [row.id]: obj ? null : e.currentTarget,
                          }));
                        }}
                      >
                        Block
                      </button>
                      <button
                        className="hover:bg-info-100"
                        onClick={async () => {
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
          <h1 className="text-2xl font-semibold largeMobile:text-xl">Users</h1>
        </div>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center border-y p-4 py-4 border-info-100">
              <div className="flex items-center gap-4 h-10 w-full">
                <OutlinedInput
                  placeholder="Search for name..."
                  className="w-[400px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
                  value={queryParams.get("q")}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (!value) {
                      return queryParams.delete("q");
                    }

                    queryParams.set("q", value);
                  }}
                />
                <Select
                  className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                  value={queryParams.get("is-active")}
                  onChange={async (e) => {
                    const chosenValue = e.target.value;

                    if (!chosenValue) {
                      return queryParams.delete("is-active");
                    }

                    queryParams.set("is-active", chosenValue);
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
              loading={isLoading}
              rows={data ? data.results : []}
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
      <BlockConfirmationModal
        open={blockModal.open}
        onClose={() => {
          setBlockModal({
            open: false,
            data: null,
          });
        }}
        data={blockModal.data as CurrentUser}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            isActive: queryParams.get("is-active"),
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
        data={deleteModal.data as CurrentUser}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            isActive: queryParams.get("is-active"),
          },
        }}
      />
      <UnblockConfirmationModal
        open={unblockModal.open}
        onClose={() => {
          setUnblockModal({
            open: false,
            data: null,
          });
        }}
        data={unblockModal.data as CurrentUser}
        pagination={pagination}
        queryParams={{
          search: queryParams.get("q"),
          filter: {
            isActive: queryParams.get("is-active"),
          },
        }}
      />
    </>
  );
}
