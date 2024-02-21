import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Avatar,
  ClickAwayListener,
  Fade,
  IconButton,
  OutlinedInput,
  Paper,
  Popper,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { GoKebabHorizontal } from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import DataGrid from "~/components/data-grid";
import { useAdminOrganizationUsers } from "~/queries/organizations";
import useDebounce from "~/hooks/debounce";

export default function UserTable() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";

  const [anchorElObj, setAnchorElObj] = useState<{ [key: string]: HTMLButtonElement | null }>({});
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
  });

  const { data, isLoading } = useAdminOrganizationUsers(
    id || "",
    useDebounce(search).trim(),
    pagination
  );

  function dropdownDisplay(id: string) {
    return Boolean(anchorElObj[id]);
  }

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
      field: "image_url",
      headerName: "",
      minWidth: 110,
      flex: 1,
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
      minWidth: 200,
      type: "string",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      minWidth: 200,
      type: "string",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      type: "string",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
    },
    {
      field: "date_joined",
      headerName: "Date Joined",
      minWidth: 200,
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "_",
      headerName: "Action",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
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
                      [row.id]: anchorElObj[row.id] ? null : e.currentTarget,
                    }))
                  }
                >
                  <GoKebabHorizontal className="rotate-90" />
                </IconButton>
                <Popper
                  transition
                  open={dropdownDisplay(row.id)}
                  anchorEl={anchorElObj[row.id]}
                  className="!mt-2"
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Paper className="flex flex-col [&>button]:p-4 [&>button]:text-sm [&>button]:py-3 overflow-hidden relative divide-y !shadow">
                        <button
                          className="hover:bg-info-100"
                          onClick={() => {
                            setAnchorElObj((prev) => ({
                              ...prev,
                              [row.id]: null,
                            }));
                          }}
                        >
                          Remove
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
      sortable: false,
    },
  ];

  return (
    <>
      <div className="border p-4 rounded-md flex flex-col gap-4">
        <h3 className="text-lg font-medium">Users</h3>
        <div className="flex flex-col gap-4">
          <OutlinedInput
            placeholder="Search..."
            className="w-[450px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !text-sm !py-0"
            value={search}
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                return setSearchParams((params) => {
                  params.delete("q");

                  return params;
                });
              }

              setSearchParams(
                (params) => {
                  params.set("q", value);

                  return params;
                },
                {
                  replace: true,
                }
              );
            }}
          />
          <div className="min-h-[500px]">
            <DataGrid
              rows={data ? data.results : []}
              loading={isLoading}
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
      </div>
    </>
  );
}
