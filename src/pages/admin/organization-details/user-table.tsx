import { useCallback, useState } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { Avatar, OutlinedInput } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoPerson, IoRemoveCircleOutline } from "react-icons/io5";
import DataGrid from "~/components/data-grid";
import { useAdminOrganizationUsers } from "~/queries/organizations";
import {
  createColumn,
  createDateColumn,
  createEmailColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";
import { OutletContext } from "~/layouts/paginated";
import usePrompt from "~/hooks/usePrompt";
import { useRemoveUserFromOrganization } from "~/mutations/organization";

export default function UserTable() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const { paginationModel, onPaginationModelChange, queryParams } =
    useOutletContext<OutletContext>();

  const search = queryParams.get("q");

  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const { data, isLoading } = useAdminOrganizationUsers(id || "", searchParams);

  const { mutateAsync: removeUserFromOrganization } = useRemoveUserFromOrganization(
    id || "",
    searchParams
  );

  const prompt = usePrompt();

  const handleRemove = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want to remove this user from this organization?",
      });

      if (confirmed) {
        await removeUserFromOrganization(id);
      }
    },
    [removeUserFromOrganization, prompt]
  );

  const PaperContent = useCallback(
    ({ row }: { row: Organization }) => {
      return (
        <>
          <button onClick={async () => await handleRemove(row.id)}>
            <IoRemoveCircleOutline />
            <span>Remove</span>
          </button>
        </>
      );
    },
    [handleRemove]
  );

  const columns: GridColDef[] = [
    createIdColumn(paginationModel),
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
    createMenuColumn({
      renderCell: createRenderCell(menuObj, setMenuObj, PaperContent),
    }),
  ];

  return (
    <>
      <div className="border p-4 rounded-md flex flex-col gap-4">
        <h3 className="text-lg font-medium">Users</h3>
        <div className="flex flex-col gap-4">
          <OutlinedInput
            placeholder="Search for user..."
            className="w-[450px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !text-sm !py-0"
            value={search}
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                return queryParams.delete("q");
              }

              queryParams.set("q", value);
            }}
          />
          <div className="min-h-[500px]">
            <DataGrid
              rows={data ? data.results : []}
              loading={isLoading}
              columns={columns}
              rowCount={data?.count || 0}
              paginationModel={paginationModel}
              onPaginationModelChange={onPaginationModelChange}
              paginationMode="server"
            />
          </div>
        </div>
      </div>
    </>
  );
}
