import { useEffect, useState } from "react";
import { IconButton, OutlinedInput } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import moment from "moment";
import { useAdminCategories } from "~/queries/category";
import DataGrid from "~/components/data-grid";
import Button from "~/components/button";
import CreateModal from "./modals/create";
import ViewModal from "./modals/view";
import DeleteConfirmation from "./modals/delete-confimation";

export default function Category() {
  const [modal, setModal] = useState<CategoyModal>({
    state: null,
    data: null,
  });

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
      field: "name",
      headerName: "Title",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "data_count",
      headerName: "No. of dataset",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 150,
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated At",
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
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="w-full">
            <IconButton
              size="medium"
              onClick={() => {
                setModal({
                  state: "view",
                  data: params.row,
                });
              }}
            >
              <IoEyeOutline className="text-lg" />
            </IconButton>
            <IconButton size="medium">
              <FiEdit className="text-sm" />
            </IconButton>
            <IconButton
              size="medium"
              onClick={() => {
                setModal({
                  state: "delete",
                  data: params.row,
                });
              }}
            >
              <MdOutlineDelete className="text-lg" />
            </IconButton>
          </div>
        );
      },
      sortable: false,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { isLoading, data } = useAdminCategories();

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-8 w-full">
        <header className="flex items-center gap-8 justify-between w-full">
          <h1 className="text-2xl largeMobile:text-xl font-semibold">Categories</h1>
        </header>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 ml-auto">
            <OutlinedInput
              placeholder="Search..."
              className="w-[500px] tablet:w-[80%] [@media(max-width:500px)]:!w-full self-end"
            />
            <Button
              onClick={() => {
                setModal({
                  state: "create",
                  data: null,
                });
              }}
              className="!py-2 !h-full"
            >
              Create a category
            </Button>
          </div>
          <div className="min-h-[500px]">
            <DataGrid
              loading={isLoading}
              rows={data?.results ? data.results : []}
              columns={columns}
            />
          </div>
        </div>
      </main>
      <CreateModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      <ViewModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      <DeleteConfirmation modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
    </>
  );
}
