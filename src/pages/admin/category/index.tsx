import { useCallback, useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OutlinedInput } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useAdminCategories } from "~/queries/category";
import DataGrid from "~/components/data-grid";
import Button from "~/components/button";
import CreateModal from "./modals/create";
import ViewModal from "./modals/view";
import useDebounce from "~/hooks/debounce";
import {
  createColumn,
  createDateColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";
import { OutletContext } from "~/layouts/paginated";
import usePrompt from "~/hooks/usePrompt";
import { useDeleteCategory } from "~/mutations/category";

export default function Category() {
  const { t } = useTranslation("dashboard-layout/admin/categories");
  const { paginationModel, onPaginationModelChange, queryParams } =
    useOutletContext<OutletContext>();

  const [searchParams] = useSearchParams();

  const search = queryParams.get("q");

  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const [modal, setModal] = useState<CategoyModal>({
    state: null,
    data: null,
  });

  const { isLoading, data } = useAdminCategories(useDebounce(search).trim());

  const { mutateAsync: deleteCategory } = useDeleteCategory(searchParams);

  const prompt = usePrompt();

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: t("delete-category-modal.body-text"),
      });

      if (confirmed) {
        await deleteCategory(id);
      }
    },
    [deleteCategory, prompt, t]
  );

  const PaperContent = useCallback(
    ({ row }: { row: Category }) => {
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
    createIdColumn(paginationModel, {
      headerName: t("table.header.no"),
    }),
    createColumn({
      field: "name",
      headerName: t("table.header.title"),
    }),
    createColumn({
      field: "data_count",
      headerName: t("table.header.datasets"),
    }),
    createDateColumn({
      field: "created_at",
      headerName: t("table.header.created-at"),
    }),
    createDateColumn({
      field: "updated_at",
      headerName: t("table.header.updated-at"),
      dateFormat: "fromNow",
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
          <h1 className="text-2xl font-semibold largeMobile:text-xl">{t("title")}</h1>
        </div>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex items-center border-y p-4 py-4 border-info-100">
            <div className="flex items-center gap-4 h-10 w-full justify-between largeMobile:gap-2">
              <OutlinedInput
                placeholder={t("search.placeholder")}
                className="w-[400px] [@media(max-width:500px)]:!w-full !h-full !text-sm"
                value={search}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!value) {
                    return queryParams.delete("q");
                  }

                  queryParams.set("q", value);
                }}
              />
              <div>
                <Button
                  onClick={() => {
                    setModal({
                      state: "create",
                      data: null,
                    });
                  }}
                  className="!py-2 !h-full flex gap-[0.35rem] largeMobile:!py-0 largeMobile:!px-0 largeMobile:!w-4"
                >
                  <span className="largeMobile:hidden">{t("button").split(" ")[0]}</span>
                  <FiPlus className="largeMobile:block hidden text-xl" />
                  <span className="tablet:hidden">{t("button").split(" ")[1]}</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="min-h-[500px] p-4">
            <DataGrid
              loading={isLoading}
              rows={data?.results ? data.results : []}
              columns={columns}
              rowCount={data?.count || 0}
              paginationModel={paginationModel}
              onPaginationModelChange={onPaginationModelChange}
              paginationMode="server"
            />
          </div>
        </div>
      </main>
      <CreateModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      <ViewModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
    </>
  );
}
