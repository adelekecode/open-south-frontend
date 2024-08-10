import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import DataGrid from "~/components/data-grid";
import Button from "~/components/button";
import CreateModal from "./modals/create";
import ViewModal from "./modals/view";
import { useAdminNews } from "~/queries/news";
import useDebounce from "~/hooks/debounce";
import Container from "~/components/dashboards/container";
import Heading from "~/components/dashboards/heading";
import {
  createColumn,
  createDateColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";
import { OutletContext } from "~/layouts/paginated";
import { useChangeNewsStatus, useDeleteNews } from "~/mutations/news";
import usePrompt from "~/hooks/usePrompt";

export default function News() {
  const { paginationModel, onPaginationModelChange, queryParams, pagination } =
    useOutletContext<OutletContext>();

  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const [modal, setModal] = useState<NewsModal>({
    state: null,
    data: null,
  });
  const [statusObj, setStatusObj] = useState<{ [key: string]: "published" | "unpublished" }>({});

  const prompt = usePrompt();

  const search = queryParams.get("q");
  const status = queryParams.get("status");

  const searchParams = {
    search: useDebounce(search).trim(),
    status,
    ...pagination,
  };

  const { isLoading, data } = useAdminNews({
    searchParams,
  });

  const { mutateAsync: changeNewsStatus } = useChangeNewsStatus({
    searchParams,
  });
  const { mutateAsync: deleteNews } = useDeleteNews();

  const handlePublish = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want publish this news?",
      });

      if (confirmed) {
        setStatusObj((prevStatusObj) => ({
          ...prevStatusObj,
          [id]: "published",
        }));
        await changeNewsStatus({ id, action: "publish" });
      }
    },
    [changeNewsStatus, prompt]
  );

  const handleUnpublish = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want unpublish this news?",
      });

      if (confirmed) {
        setStatusObj((prevStatusObj) => ({
          ...prevStatusObj,
          [id]: "unpublished",
        }));
        await changeNewsStatus({ id, action: "unpublish" });
      }
    },
    [changeNewsStatus, prompt]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want to delete this news?",
      });

      if (confirmed) {
        await deleteNews(id);
      }
    },
    [deleteNews, prompt]
  );

  const PaperContent = useCallback(
    ({ row }: { row: News }) => {
      return (
        <>
          <button
            onClick={() => {
              setModal({
                state: "view",
                data: row,
              });
            }}
          >
            <IoEyeOutline />
            <span>View</span>
          </button>
          <button
            onClick={() => {
              setModal({
                state: "edit",
                data: row,
              });
            }}
          >
            <FiEdit />
            <span>Edit</span>
          </button>
          <button onClick={async () => await handleDelete(row.id)}>
            <MdOutlineDelete />
            <span>Delete</span>
          </button>
        </>
      );
    },
    [handleDelete]
  );

  const columns: GridColDef[] = [
    createIdColumn(paginationModel),
    createColumn({
      field: "title",
      headerName: "Title",
    }),
    createColumn({
      field: "views",
      headerName: "Views",
      minWidth: 150,
    }),
    createDateColumn({
      field: "created_at",
      headerName: "Created At",
    }),
    createDateColumn({
      field: "updated_at",
      headerName: "Updated At",
      dateFormat: "fromNow",
    }),
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row, value }) => {
        // const val =
        // value === "published" ? "publish" : value === "unpublished" ? "unpublish" : value;
        const newValue = statusObj[row.id] || value;

        return (
          <Select
            className="w-[180px] !text-[0.85rem] !py-0 !px-0"
            value={newValue}
            onChange={async (e) => {
              const value = e.target.value as "draft" | "unpublished" | "published";

              if (value === "published") {
                return await handlePublish(row.id);
              }

              if (value === "unpublished") {
                return await handleUnpublish(row.id);
              }
            }}
          >
            <MenuItem value="draft" className="!hidden">
              Draft
            </MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="unpublished">Unpublished</MenuItem>
          </Select>
        );
      },
    },
    createMenuColumn({
      renderCell: createRenderCell(menuObj, setMenuObj, PaperContent),
    }),
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Container header={<Heading>News</Heading>}>
        <div className="flex items-center border-b p-4 py-4 border-info-100">
          <div className="w-full flex items-center gap-4 h-10 justify-between">
            <div className="flex items-center gap-4">
              <OutlinedInput
                placeholder="Search for title..."
                value={search}
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
                className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                value={status}
                onChange={async (e) => {
                  const value = e.target.value;

                  if (!value) {
                    return queryParams.delete("status");
                  }

                  queryParams.set("status", value);
                }}
                displayEmpty
              >
                <MenuItem value="" className="placeholder">
                  <span className="text-info-600">Select status</span>
                </MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="unpublished">Unpublished</MenuItem>
              </Select>
            </div>
            <Button
              onClick={() => {
                setModal({
                  state: "create",
                  data: null,
                });
              }}
              className="whitespace-nowrap"
            >
              Add News
            </Button>
          </div>
        </div>
        <div className="p-4">
          <DataGrid
            rows={data?.results || []}
            loading={isLoading}
            columns={columns}
            rowCount={data?.count || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            paginationMode="server"
          />
        </div>
      </Container>
      {(modal.state === "create" || modal.state === "edit") && (
        <CreateModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      )}
      {modal.state === "view" && (
        <ViewModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      )}
    </>
  );
}
