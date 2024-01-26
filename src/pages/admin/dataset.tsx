import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useChangeDatasetStatus } from "~/mutations/dataset";

export default function Dataset() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [statusObj, setStatusObj] = useState<{ [key: string]: Dataset["status"] }>({});

  const dropdownDisplay = Boolean(anchorEl);

  const { data, isLoading } = useAdminDatasets();
  const changeDatasetStatus = useChangeDatasetStatus();

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
      width: 150,
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

                await changeDatasetStatus.mutateAsync({
                  id: row.id,
                  action: chosenValue as Dataset["status"],
                });
              }
            }}
          >
            <MenuItem value="pending" className="!hidden">
              Pending
            </MenuItem>
            <MenuItem value="unpublished" className={`${value === "unpublished" && "!hidden"}`}>
              Unpublished
            </MenuItem>
            <MenuItem value="published" className={`${value === "published" && "!hidden"}`}>
              Published
            </MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="further_review">Further Review</MenuItem>
          </Select>
        );
      },
      sortable: false,
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      minWidth: 150,
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
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => {
        return moment(value).fromNow();
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
      renderCell: () => {
        return (
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <div>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(anchorEl ? null : e.currentTarget);
                }}
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
