import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { useOrganizationUsers } from "~/queries/organizations";

export default function UserTable() {
  const { id } = useParams();

  const [anchorElObj, setAnchorElObj] = useState<{ [key: string]: HTMLButtonElement | null }>({});

  function dropdownDisplay(id: string) {
    return Boolean(anchorElObj[id]);
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S/N",
      minWidth: 10,
      renderCell: ({ api, row }) => {
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1;
      },
    },
    {
      field: "image_url",
      headerName: "",
      minWidth: 40,
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
      minWidth: 150,
      type: "string",
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      minWidth: 150,
      type: "string",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      type: "string",
      headerAlign: "center",
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
      minWidth: 150,
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
    },
    {
      field: "_",
      headerName: "Action",
      minWidth: 10,
      flex: 1,
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

  const { data, isLoading } = useOrganizationUsers(id || "");

  return (
    <>
      <div className="border p-4 rounded-md flex flex-col gap-4">
        <h3 className="text-xl font-medium">Users</h3>
        <div className="flex flex-col gap-4">
          <OutlinedInput
            placeholder="Search..."
            className="w-[450px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !text-sm !py-0"
          />
          <div className="min-h-[500px]">
            <DataGrid rows={data ? data.results : []} loading={isLoading} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
