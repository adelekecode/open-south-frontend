import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IconButton, OutlinedInput } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import moment from "moment";
import { useAdminCategories } from "~/queries/category";
import DataGrid from "~/components/data-grid";
import Button from "~/components/button";
import CreateModal from "./modals/create";
import ViewModal from "./modals/view";
import DeleteConfirmation from "./modals/delete-confimation";
import useDebounce from "~/hooks/debounce";

export default function Category() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";

  const [modal, setModal] = useState<CategoyModal>({
    state: null,
    data: null,
  });
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const { isLoading, data } = useAdminCategories(useDebounce(search).trim(), {
    ...pagination,
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 10,
      renderCell: ({ api, row }) => {
        const { page, pageSize } = pagination;
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1 + page * pageSize;
      },
    },
    {
      field: "name",
      headerName: "Title",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "data_count",
      headerName: "dataset",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => {
        const result = moment(value).fromNow();

        if (result === "a day ago") {
          return "Yesterday";
        }

        return result.charAt(0).toUpperCase() + result.slice(1);
      },
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() - new Date(v2).getTime();
      },
    },
    {
      field: "_",
      headerName: "Action",
      minWidth: 160,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="w-full items-center justify-center flex">
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
            <IconButton
              size="medium"
              onClick={() => {
                setModal({
                  state: "edit",
                  data: params.row,
                });
              }}
            >
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

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold largeMobile:text-xl">Categories</h1>
        </div>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex items-center border-y p-4 py-4 border-info-100">
            <div className="flex items-center gap-4 h-10 w-full justify-between largeMobile:gap-2">
              <OutlinedInput
                placeholder="Search for title..."
                className="w-[400px] [@media(max-width:500px)]:!w-full !h-full !text-sm"
                value={search}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!value) {
                    return setSearchParams((params) => {
                      params.delete("q");

                      return params;
                    });
                  }

                  setSearchParams(
                    (params) => {
                      params.set("q", value);

                      return params;
                    },
                    {
                      replace: true,
                    }
                  );
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
                  <span className="largeMobile:hidden">Add</span>
                  <FiPlus className="largeMobile:block hidden text-xl" />
                  <span className="tablet:hidden">Category</span>
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
              paginationModel={pagination}
              onPaginationModelChange={({ page, pageSize }, { reason }) => {
                if (!reason) return;

                setPagination({
                  page,
                  pageSize,
                });
              }}
              paginationMode="server"
            />
          </div>
        </div>
      </main>
      <CreateModal
        modal={modal}
        setModal={(obj: typeof modal) => setModal(obj)}
        pagination={pagination}
      />
      <ViewModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      <DeleteConfirmation
        modal={modal}
        setModal={(obj: typeof modal) => setModal(obj)}
        pagination={pagination}
      />
    </>
  );
}
