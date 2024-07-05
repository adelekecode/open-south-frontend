import { useCallback, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { twMerge } from "tailwind-merge";
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

  const { data: developers, isLoading } = useGetDevelopers(
    useDebounce(queryParams.get("q")).trim()
  );

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
    ({ row }: { row: { is_active: boolean; id: string } }) => {
      return (
        <>
          {row.is_active ? (
            <button onClick={async () => await handleBlock(row.id)}>
              <MdOutlineBlock />
              <span>Block</span>
            </button>
          ) : (
            <button onClick={async () => await handleUnblock(row.id)}>
              <CgUnblock />
              <span>Unblock</span>
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
