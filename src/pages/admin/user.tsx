import { useEffect, useState } from "react";
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
import { IoPerson } from "react-icons/io5";
import { GoKebabHorizontal } from "react-icons/go";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import { useGetAllUsers } from "~/queries/user";

export default function User() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const dropdownDisplay = Boolean(anchorEl);

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
    },
    {
      field: "last_name",
      headerName: "Last Name",
      minWidth: 150,
      type: "string",
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
    },
    {
      field: "date_joined",
      headerName: "Date Joined",
      minWidth: 150,
      type: "string",
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
    },
    {
      field: "_",
      headerName: "Action",
      minWidth: 10,
      renderCell: () => {
        return (
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <div>
              <IconButton
                size="small"
                onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
              >
                <GoKebabHorizontal className="rotate-90" />
              </IconButton>
              <Popper transition open={dropdownDisplay} anchorEl={anchorEl} className="!mt-2">
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={200}>
                    <Paper className="flex flex-col [&>button]:p-4 [&>button]:text-sm [&>button]:py-3 overflow-hidden relative divide-y !shadow">
                      <button
                        className="hover:bg-info-100"
                        onClick={() => {
                          setAnchorEl(null);
                        }}
                      >
                        block
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

  const { isLoading, data } = useGetAllUsers();

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-8 w-full">
        <header className="flex items-center gap-8 justify-between w-full">
          <h1 className="text-2xl largeMobile:text-xl font-semibold">Users</h1>
        </header>
        <div className="flex flex-col gap-4">
          <OutlinedInput
            placeholder="Search..."
            className="w-[500px] tablet:w-[80%] [@media(max-width:500px)]:!w-full self-end"
          />
          <div className="min-h-[500px]">
            <DataGrid
              loading={isLoading}
              rows={
                data
                  ? data.map((item, index) => {
                      //! Refactor
                      const { image_url, email, first_name, last_name, date_joined } = item;

                      return {
                        id: index + 1,
                        image_url,
                        first_name,
                        last_name,
                        email,
                        date_joined,
                      };
                    })
                  : []
              }
              columns={columns}
            />
          </div>
        </div>
      </main>
    </>
  );
}
