import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { twMerge } from "tailwind-merge";
import { MdOutlineDelete } from "react-icons/md";
import DataGrid from "~/components/data-grid";
import PublishConfirmationModal from "./status-confirmation-modals/publish";
import UnpublishConfirmationModal from "./status-confirmation-modals/unpublish";
import FurtherReviewConfirmationModal from "./status-confirmation-modals/further-review";
import useDebounce from "~/hooks/debounce";
import {
  createColumn,
  createDateColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
} from "~/utils/table-helpers";
import { OutletContext } from "~/layouts/paginated";
import { useChangeDatasetStatus } from "~/mutations/dataset";
import usePrompt from "~/hooks/usePrompt";
import { useAdminDatasets } from "~/queries/dataset";

type Modal = {
  open: boolean;
  data: Dataset | null;
};

export default function Dataset() {
  const navigate = useNavigate();

  const { paginationModel, onPaginationModelChange, queryParams } =
    useOutletContext<OutletContext>();

  const search = queryParams.get("q") || "";
  const status = queryParams.get("status") || "";

  const [publishModal, setPublishModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const [statusObj, setStatusObj] = useState<{
    [key: string]: "delete" | "published" | "unpublished";
  }>({});

  const [rejectModal, setRejectModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [unpublishModal, setUnpublishModal] = useState<Modal>({
    open: false,
    data: null,
  });
  const [furtherReviewModal, setFurtherReviewModal] = useState<Modal>({
    open: false,
    data: null,
  });

  const { data, isLoading } = useAdminDatasets(useDebounce(search).trim());

  const { mutateAsync: changeDatasetStatus } = useChangeDatasetStatus();

  const prompt = usePrompt();

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want to delete this dataset?",
      });

      if (confirmed) {
        setStatusObj((prevStatusObj) => ({
          ...prevStatusObj,
          [id]: "unpublished",
        }));
        await changeDatasetStatus({ id, action: "delete" });
      }
    },
    [changeDatasetStatus, prompt]
  );

  const PaperContent = useCallback(
    ({ row }: { row: News }) => {
      return (
        <>
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
    createColumn({
      field: "views",
      headerName: "Views",
      minWidth: 100,
    }),
    createColumn({
      field: "files_count",
      headerName: "Files",
      minWidth: 100,
    }),
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 180,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ value, row }) => {
        const modals = {
          unpublished: setUnpublishModal,
          published: setPublishModal,
          rejected: setRejectModal,
          further_review: setFurtherReviewModal,
        };

        const options = [
          { value: "pending", label: "Pending", condition: [] },
          { value: "unpublished", label: "Unpublished", condition: ["published", "unpublished"] },
          { value: "published", label: "Published" },
          { value: "rejected", label: "Rejected", condition: ["further_review", "pending"] },
          {
            value: "further_review",
            label: "Further Review",
            condition: ["rejected", "pending"],
          },
        ];

        return (
          <Select
            className="w-full !text-[0.85rem] !py-0 !px-0"
            value={value}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={async (e) => {
              const chosenValue = e.target.value;

              if (chosenValue !== "pending") {
                const modalSetter = modals[chosenValue as keyof typeof modals];

                if (modalSetter) {
                  modalSetter({
                    open: true,
                    data: row,
                  });
                }
              }
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={index + 1}
                value={option.value}
                className={twMerge(
                  !option.condition || option.condition.includes(value) ? "" : "!hidden",
                  option.value === value ? "!hidden" : ""
                )}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      },
      sortable: false,
    },
    createDateColumn({
      field: "created_at",
      headerName: "Created At",
    }),
    createDateColumn({
      field: "updated_at",
      headerName: "Updated AT",
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
          <h1 className="text-2xl font-semibold largeMobile:text-xl">Datasets</h1>
        </div>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex items-center border-y p-4 py-4 border-info-100">
            <div className="flex items-center gap-4 h-10 w-full">
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
                className="w-[400px] tablet:w-[80%] [@media(max-width:500px)]:!w-full !h-full !text-sm"
              />
              <Select
                className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                value={status}
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
                  <span className="text-info-600">Filter by status</span>
                </MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="unpublished">Unpublished</MenuItem>
                <MenuItem value="further_review">Further Review</MenuItem>
              </Select>
            </div>
          </div>
          <div className="min-h-[500px] p-4">
            <DataGrid
              rows={data ? data.results : []}
              onRowClick={(params) => {
                navigate(`./${params.id}`);
              }}
              loading={isLoading}
              getRowClassName={() => `cursor-pointer`}
              columns={columns}
              rowCount={data?.count || 0}
              paginationModel={paginationModel}
              onPaginationModelChange={onPaginationModelChange}
              paginationMode="server"
            />
          </div>
        </div>
      </main>
      {publishModal.open && (
        <PublishConfirmationModal
          open={publishModal.open}
          onClose={() => {
            setPublishModal({
              open: false,
              data: null,
            });
          }}
          data={publishModal.data as Dataset}
          pagination={paginationModel}
          queryParams={{
            search,
            filter: {
              status,
            },
          }}
        />
      )}
      {/* {rejectModal.open && (
        <RejectConfirmationModal
          open={rejectModal.open}
          onClose={() => {
            setRejectModal({
              open: false,
              data: null,
            });
          }}
          data={rejectModal.data as Dataset}
          pagination={paginationModel}
          queryParams={{
            search,
            filter: {
              status,
            },
          }}
        />
      )} */}
      {unpublishModal.open && (
        <UnpublishConfirmationModal
          open={unpublishModal.open}
          onClose={() => {
            setUnpublishModal({
              open: false,
              data: null,
            });
          }}
          data={unpublishModal.data as Dataset}
          pagination={paginationModel}
          queryParams={{
            search,
            filter: {
              status,
            },
          }}
        />
      )}
      {furtherReviewModal.open && (
        <FurtherReviewConfirmationModal
          open={furtherReviewModal.open}
          onClose={() => {
            setFurtherReviewModal({
              open: false,
              data: null,
            });
          }}
          data={furtherReviewModal.data as Dataset}
          pagination={paginationModel}
          queryParams={{
            search,
            filter: {
              status,
            },
          }}
        />
      )}
    </>
  );
}
