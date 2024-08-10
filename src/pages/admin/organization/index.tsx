import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Avatar, MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { CgUnblock } from "react-icons/cg";
import { IoEyeOutline } from "react-icons/io5";
import { MdBlock, MdOutlineDelete } from "react-icons/md";
import DataGrid from "~/components/data-grid";
import { useAdminOrganizations, useAdminOrganizationsIndicators } from "~/queries/organizations";
import RejectConfirmationModal from "./reject-modal";
import {
  createColumn,
  createDateColumn,
  createIdColumn,
  createMenuColumn,
  createRenderCell,
  createStateColumn,
} from "~/utils/table-helpers";
import { OutletContext } from "~/layouts/paginated";
import usePrompt from "~/hooks/usePrompt";
import { useChangeOrganizationStatus } from "~/mutations/organization";
import Container from "~/components/dashboards/container";
import Heading from "~/components/dashboards/heading";

type Modal = {
  open: boolean;
  data: Organization | null;
};

export default function Organization() {
  const navigate = useNavigate();

  const { paginationModel, onPaginationModelChange, queryParams } =
    useOutletContext<OutletContext>();

  const [searchParams] = useSearchParams();

  const search = queryParams.get("q");

  const [menuObj, setMenuObj] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const [rejectModal, setRejectModal] = useState<Modal>({
    open: false,
    data: null,
  });

  const { data, isLoading } = useAdminOrganizations(searchParams);
  const { data: indicatorData } = useAdminOrganizationsIndicators();
  const { mutateAsync: changeOrganizationStatus } = useChangeOrganizationStatus(searchParams);

  const prompt = usePrompt();

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want to delete this organization?",
      });

      if (confirmed) {
        await changeOrganizationStatus({
          action: "delete",
          id,
        });
      }
    },
    [changeOrganizationStatus, prompt]
  );

  const handleApprove = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want to approve this organization?",
      });

      if (confirmed) {
        await changeOrganizationStatus({
          action: "approved",
          id,
        });
      }
    },
    [changeOrganizationStatus, prompt]
  );

  const handleUnblock = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want unblock this organization?",
      });

      if (confirmed) {
        await changeOrganizationStatus({
          action: "unblock",
          id,
        });
      }
    },
    [changeOrganizationStatus, prompt]
  );

  const handleBlock = useCallback(
    async (id: string) => {
      const confirmed = await prompt({
        title: "Please confirm",
        description: "Are you sure you want block this organization?",
      });

      if (confirmed) {
        await changeOrganizationStatus({
          action: "block",
          id,
        });
      }
    },
    [changeOrganizationStatus, prompt]
  );

  const PaperContent = useCallback(
    ({ row }: { row: Organization }) => {
      return (
        <>
          <button
            onClick={() => {
              navigate(`./${row.id}`);
            }}
          >
            <IoEyeOutline />
            <span>View</span>
          </button>
          {row.is_verified &&
            (row.is_active ? (
              <button onClick={async () => await handleUnblock(row.id)}>
                <CgUnblock />
                <span>Unblock</span>
              </button>
            ) : (
              <button onClick={async () => await handleBlock(row.id)}>
                <MdBlock />
                <span>Block</span>
              </button>
            ))}
          <button onClick={async () => await handleDelete(row.id)}>
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
    createColumn({
      field: "logo_url",
      headerName: "",
      minWidth: 110,
      renderCell: (params) => {
        return (
          <Avatar className="mx-auto !bg-transparent">
            <img
              src={params.value}
              alt="organization picture"
              className="w-full h-full object-contain"
            />
          </Avatar>
        );
      },
      editable: false,
      filterable: false,
      sortable: false,
    }),
    createColumn({
      field: "name",
      headerName: "NAME",
    }),

    createColumn({
      field: "data_count",
      headerName: "Datasets",
      minWidth: 150,
    }),
    createColumn({
      field: "views_count",
      headerName: "Views",
      minWidth: 150,
    }),
    createColumn({
      field: "downloads_count",
      headerName: "Downloads",
      minWidth: 150,
    }),
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 180,
      flex: 1,
      renderCell: ({ value, row }) => {
        return (
          <Tooltip title={!row.is_verified && "Organization not verified"}>
            <Select
              className="w-[180px] !text-[0.85rem] !py-0 !px-0"
              value={value}
              disabled={!row.is_verified}
              onChange={async (e) => {
                const chosenValue = e.target.value;

                if (chosenValue === "rejected") {
                  return setRejectModal({
                    open: true,
                    data: row,
                  });
                }

                if (chosenValue === "approved") {
                  return await handleApprove(row.id);
                }
              }}
            >
              <MenuItem value="pending" className="!hidden">
                Pending
              </MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
            </Select>
          </Tooltip>
        );
      },
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    createDateColumn({
      field: "created_at",
      headerName: "Created At",
    }),
    createDateColumn({
      field: "updated_at",
      headerName: "Updated AT",
      dateFormat: "fromNow",
    }),
    createStateColumn({
      field: "is_verified",
      headerName: "Verified",
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
      <Container header={<Heading>Organization</Heading>}>
        <div className="bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 flex-wrap p-4 [&>div]:flex [&>div]:items-center [&>div]:gap-3 [&>div]:text-sm [&>div]:border [&>div]:rounded [&>div]:p-2 [&>div]:px-3 [&>div>*]:text-xs">
              <div className="border-orange-500 [&>*]:text-orange-500">
                <p>Pending</p>
                <span>{indicatorData?.pending || 0}</span>
              </div>
              <div className="border-blue-500 [&>*]:text-blue-500">
                <p>Approved</p>
                <span>{indicatorData?.approved || 0}</span>
              </div>
              <div className="border-red-500 [&>*]:text-red-500">
                <p>Rejected</p>
                <span>{indicatorData?.rejected || 0}</span>
              </div>
            </div>
            <div className="flex items-center border-y p-4 py-4 border-info-100">
              <div className="flex items-center gap-4 h-10 w-full">
                <OutlinedInput
                  placeholder="Search for name..."
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
              </div>
            </div>
            <div className="flex w-full items-center border-b p-4 py-4 border-info-100">
              <div className="flex w-full items-center justify-end gap-4 h-10">
                <Select
                  className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                  value={queryParams.get("status") || ""}
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
                  <MenuItem value="approved">Approved</MenuItem>
                </Select>
                <Select
                  className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                  value={queryParams.get("verified")}
                  onChange={async (e) => {
                    const chosenValue = e.target.value;

                    if (!chosenValue) {
                      return queryParams.delete("verified");
                    }

                    queryParams.set("verified", chosenValue);
                  }}
                  displayEmpty
                >
                  <MenuItem value="" className="placeholder">
                    <span className="text-info-600">Filter by verified</span>
                  </MenuItem>
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
                <Select
                  className="w-[200px] !text-sm !py-0 !px-0 !h-full"
                  value={queryParams.get("active")}
                  onChange={async (e) => {
                    const chosenValue = e.target.value;

                    if (!chosenValue) {
                      return queryParams.delete("active");
                    }

                    queryParams.set("active", chosenValue);
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
          <div className="min-h-[500px] p-4">
            <DataGrid
              className="!border-info-150"
              rows={data ? data.results : []}
              loading={isLoading}
              columns={columns}
              onRowClick={(params) => {
                navigate(`./${params.id}`);
              }}
              getRowClassName={() => `cursor-pointer`}
              rowCount={data?.count || 0}
              paginationModel={paginationModel}
              onPaginationModelChange={onPaginationModelChange}
              paginationMode="server"
            />
          </div>
        </div>
      </Container>
      {rejectModal.open && (
        <RejectConfirmationModal
          onClose={() => {
            setRejectModal({
              open: false,
              data: null,
            });
          }}
          data={rejectModal.data as Organization}
        />
      )}
    </>
  );
}
