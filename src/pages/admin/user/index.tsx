import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Avatar, MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline, IoPerson } from "react-icons/io5";
import { MdBlock, MdOutlineDelete } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import DataGrid from "~/components/data-grid";
import { useGetAllUsers } from "~/queries/user";
import {
  createColumn,
  createDateColumn,
  createEmailColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
  createStateColumn,
} from "~/utils/table-helpers";
import usePrompt from "~/hooks/usePrompt";
import { OutletContext } from "~/layouts/paginated";
import { useChangeUserStatus } from "~/mutations/user";

export default function User() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { paginationModel, onPaginationModelChange, queryParams } =
    useOutletContext<OutletContext>();

  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const { isLoading, data } = useGetAllUsers(searchParams);
  const { mutateAsync: changeUserStatus } = useChangeUserStatus(searchParams);

  const prompt = usePrompt();

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want to delete this user?",
      });

      if (confirmed) {
        await changeUserStatus({
          action: "delete",
          id,
        });
      }
    },
    [changeUserStatus, prompt]
  );

  const handleBlock = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want block this user?",
      });

      if (confirmed) {
        await changeUserStatus({
          action: "block",
          id,
        });
      }
    },
    [changeUserStatus, prompt]
  );

  const handleUnblock = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want unblock this user?",
      });

      if (confirmed) {
        await changeUserStatus({
          action: "unblock",
          id,
        });
      }
    },
    [changeUserStatus, prompt]
  );

  const PaperContent = useCallback(
    ({ row }: { row: CurrentUser }) => {
      return (
        <>
          <button
            onClick={() => {
              navigate(`/users/${row.id}`);
            }}
          >
            <IoEyeOutline />
            <span>View</span>
          </button>
          {row.is_active ? (
            <button onClick={async () => await handleUnblock(row.id)}>
              <CgUnblock />
              <span>Unblock</span>
            </button>
          ) : (
            <button onClick={async () => await handleBlock(row.id)}>
              <MdBlock />
              <span>Block</span>
            </button>
          )}
          <button
            onClick={async () => {
              await handleDelete(row.id);
            }}
          >
            <MdOutlineDelete />
            <span>Delete</span>
          </button>
        </>
      );
    },
    [handleBlock, handleDelete, handleUnblock, navigate]
  );

  const columns: GridColDef[] = [
    createIdColumn(paginationModel),
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
    createColumn({
      field: "first_name",
      headerName: "First Name",
    }),
    createColumn({
      field: "last_name",
      headerName: "Last Name",
    }),
    createEmailColumn(),
    createDateColumn({
      field: "date_joined",
      headerName: "Date Joined",
    }),
    createStateColumn({
      field: "is_active",
      headerName: "Active",
    }),
    createMenuColumn({
      renderCell: createRenderCell(menuObj, setMenuObj, PaperContent),
    }),
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
              paginationModel={paginationModel}
              onPaginationModelChange={onPaginationModelChange}
              paginationMode="server"
            />
          </div>
        </div>
      </main>
    </>
  );
}
