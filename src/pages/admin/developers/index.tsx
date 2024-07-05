import { useCallback, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { MdOutlineBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import Container from "~/components/dashboards/container";
import Heading from "~/components/dashboards/heading";
import DataGrid from "~/components/data-grid";
import { OutletContext } from "~/layouts/paginated";
import { useGetDevelopers } from "~/queries/developers";
import useDebounce from "~/hooks/debounce";
import {
  createColumn,
  createDateColumn,
  createEmailColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";
import usePrompt from "~/hooks/usePrompt";
import { useBlockDeveloper, useUnblockDeveloper } from "~/mutations/developer";

export default function Developers() {
  const { paginationModel, onPaginationModelChange, queryParams } =
    useOutletContext<OutletContext>();

  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const { data: developers, isLoading } = useGetDevelopers({
    search: useDebounce(queryParams.get("q")).trim(),
    filterBy: {
      status: queryParams.get("status"),
    },
    pagination: paginationModel,
  });

  const { mutateAsync: blockDeveloper } = useBlockDeveloper();
  const { mutateAsync: unblockDeveloper } = useUnblockDeveloper();

  const prompt = usePrompt();

  const handleBlock = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description:
          "When this action is triggered, the user's access to the developer features will be revoked.",
      });

      if (confirmed) {
        await blockDeveloper(id);
      }
    },
    [blockDeveloper, prompt]
  );

  const handleUnblock = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description:
          "When this action is triggered, the user's access to the developer features will be reactivated.",
      });

      if (confirmed) {
        await unblockDeveloper(id);
      }
    },
    [unblockDeveloper, prompt]
  );

  const PaperContent = useCallback(
    ({ row }: { row: CurrentUser }) => {
      return (
        <>
          {row.api_?.is_active ? (
            <button onClick={async () => await handleUnblock(row.id)}>
              <CgUnblock />
              <span>Unblock</span>
            </button>
          ) : (
            <button onClick={async () => await handleBlock(row.id)}>
              <MdOutlineBlock />
              <span>Block</span>
            </button>
          )}
        </>
      );
    },
    [handleBlock, handleUnblock]
  );

  const columns: GridColDef[] = useMemo(() => {
    return [
      createIdColumn(paginationModel),
      createColumn({
        field: "first_name",
        headerName: "First Name",
        valueGetter: ({ row }) => {
          return row.user_.first_name;
        },
      }),
      createColumn({
        field: "last_name",
        headerName: "Last Name",
        valueGetter: ({ row }) => {
          return row.user_.last_name;
        },
      }),
      createEmailColumn({
        valueGetter: ({ row }) => {
          return row.user_.email;
        },
      }),
      createDateColumn({
        field: "created_at",
        headerName: "Created At",
      }),
      createMenuColumn({
        renderCell: createRenderCell(menuObj, setMenuObj, PaperContent),
      }),
    ];
  }, [PaperContent, menuObj, paginationModel]);

  return (
    <>
      <Container header={<Heading>Developers</Heading>}>
        <div className="flex items-center border-b p-4 border-info-100">
          <div className="w-full flex items-center gap-4 h-10 justify-between">
            <div className="flex items-center gap-4">
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
                className="w-[300px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
              />
              <Select
                className="w-[200px] !text-sm"
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
                  <span className="text-info-600">Select status</span>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="p-4">
          <DataGrid
            rows={developers?.results || []}
            loading={isLoading}
            columns={columns}
            rowCount={developers?.count || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            paginationMode="server"
          />
        </div>
      </Container>
    </>
  );
}
