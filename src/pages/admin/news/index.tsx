import { useEffect, useState } from "react";
import { IconButton, MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import moment from "moment";
import DataGrid from "~/components/data-grid";
import Button from "~/components/button";
import CreateModal from "./modals/create";
import ViewModal from "./modals/view";
import DeleteConfirmationModal from "./confirmation-modals/delete";
import PublishConfirmationModal from "./confirmation-modals/publish";
import UnpublishConfirmationModal from "./confirmation-modals/unpublish";
import { useAdminNews } from "~/queries/news";
import useAdminTableStore from "~/store/admin-table";
import useDebounce from "~/hooks/debounce";

type Modal = {
  open: boolean;
  data: News | null;
};

export default function News() {
  const { news: newsTable, setNews: setNewsTable } = useAdminTableStore();
  const { pagination, filterBy, search } = newsTable;

  const [modal, setModal] = useState<NewsModal>({
    state: null,
    data: null,
  });
  const [statusObj, setStatusObj] = useState<{ [key: string]: string }>({});
  const [publishModal, setPublishModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [unpublishModal, setUnpublishModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState<Modal>({
    open: false,
    data: null,
  });

  const { isLoading, data } = useAdminNews(
    useDebounce(search).trim(),
    {
      status: filterBy.status as string,
    },
    {
      ...pagination,
    }
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      minWidth: 100,
      renderCell: ({ api, row }) => {
        const { page, pageSize } = pagination;
        const { getAllRowIds } = api;

        return getAllRowIds().indexOf(row.id) + 1 + page * pageSize;
      },
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "views",
      headerName: "Views",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 180,
      type: "string",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      minWidth: 180,
      flex: 1,
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
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row, value }) => {
        const val =
          value === "published" ? "publish" : value === "unpublished" ? "unpublish" : value;
        const newValue = statusObj[row.id] || val;

        return (
          <Select
            className="w-[180px] !text-[0.85rem] !py-0 !px-0"
            value={newValue}
            onChange={async (e) => {
              const chosenValue = e.target.value;

              if (chosenValue === "draft") {
                return;
              }

              if (chosenValue && chosenValue !== statusObj[row.id]) {
                setStatusObj((prevStatusObj) => ({
                  ...prevStatusObj,
                  [row.id]: chosenValue,
                }));
              }
            }}
          >
            <MenuItem value="draft" className="!hidden">
              Draft
            </MenuItem>
            <MenuItem
              value="publish"
              onClick={() => {
                setPublishModal({
                  open: true,
                  data: row,
                });
              }}
            >
              Published
            </MenuItem>
            <MenuItem
              value="unpublish"
              onClick={() => {
                setUnpublishModal({
                  open: true,
                  data: row,
                });
              }}
            >
              Unpublished
            </MenuItem>
          </Select>
        );
      },
    },
    {
      field: "_",
      headerName: "Action",
      minWidth: 160,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <div className="w-full flex items-center justify-center gap-1">
            <IconButton
              size="medium"
              // color="success"
              onClick={() => {
                setModal({
                  state: "view",
                  data: row,
                });
              }}
            >
              <IoEyeOutline className="text-lg" />
            </IconButton>
            <IconButton
              // color="warning"
              onClick={() => {
                setModal({
                  state: "edit",
                  data: row,
                });
              }}
            >
              <FiEdit className="text-sm" />
            </IconButton>
            <IconButton
              size="medium"
              // color="error"
              onClick={() => {
                setDeleteModal({
                  open: true,
                  data: row,
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
          <h1 className="text-2xl font-semibold largeMobile:text-xl">News</h1>
        </div>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex items-center border-b p-4 py-4 border-info-100">
            <div className="w-full flex items-center gap-4 h-10 justify-between">
              <div className="flex items-center gap-4">
                <OutlinedInput
                  placeholder="Search for title..."
                  value={search}
                  onChange={(e) => {
                    setNewsTable({
                      ...newsTable,
                      search: e.target.value,
                    });
                  }}
                  className="w-[300px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
                />
                <Select
                  className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                  value={filterBy.status || ""}
                  onChange={async (e) => {
                    const chosenValue = e.target.value;

                    setNewsTable({
                      ...newsTable,
                      filterBy: {
                        ...filterBy,
                        status: chosenValue as typeof filterBy.status,
                      },
                    });
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
                className="!py-2 !h-full"
              >
                Add News
              </Button>
            </div>
          </div>
          <div className="min-h-[500px] p-4">
            <DataGrid
              className="!border-info-150"
              rows={data ? data.results : []}
              loading={isLoading}
              columns={columns}
              rowCount={data?.count}
            />
          </div>
        </div>
      </main>
      <CreateModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      {modal.state === "view" && (
        <ViewModal modal={modal} setModal={(obj: typeof modal) => setModal(obj)} />
      )}
      <DeleteConfirmationModal
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({
            open: false,
            data: null,
          });
        }}
        data={deleteModal.data as News}
      />
      <PublishConfirmationModal
        open={publishModal.open}
        onClose={() => {
          setPublishModal({
            open: false,
            data: null,
          });
        }}
        data={publishModal.data as News}
      />
      <UnpublishConfirmationModal
        open={unpublishModal.open}
        onClose={() => {
          setUnpublishModal({
            open: false,
            data: null,
          });
        }}
        data={unpublishModal.data as News}
      />
    </>
  );
}
