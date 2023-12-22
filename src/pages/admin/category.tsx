import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, OutlinedInput } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import moment from "moment";
import { useCategories } from "~/queries/category";
import DataGrid from "~/components/data-grid";
import Button from "~/components/button";

export default function Category() {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "sn",
      headerName: "S/N",
      minWidth: 10,
    },
    {
      field: "name",
      headerName: "Title",
      minWidth: 150,
    },
    {
      field: "data_count",
      headerName: "No. of dataset",
      minWidth: 150,
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 150,
      type: "string",
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      minWidth: 150,
      type: "string",
      renderCell: (params) => {
        return <p>{moment(params.value).format("MMMM D, YYYY")}</p>;
      },
    },
    {
      field: "_",
      headerName: "Action",
      minWidth: 120,
      renderCell: () => {
        return (
          <div className="flex gap-1">
            <IconButton size="small">
              <IoEyeOutline />
            </IconButton>
            <IconButton size="small">
              <FiEdit />
            </IconButton>
            <IconButton size="small">
              <MdOutlineDelete />
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

  const { isLoading, data } = useCategories();

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-8 w-full">
        <header className="flex items-center gap-8 justify-between w-full">
          <h1 className="text-2xl largeMobile:text-xl font-semibold">Users</h1>
        </header>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 ml-auto">
            <OutlinedInput
              placeholder="Search..."
              className="w-[500px] tablet:w-[80%] [@media(max-width:500px)]:!w-full self-end"
            />
            <Button
              onClick={() => {
                navigate("./new");
              }}
              className="!py-2 !h-full"
            >
              Create a category
            </Button>
          </div>
          <div className="min-h-[500px]">
            <DataGrid
              loading={isLoading}
              rows={data ? data.data.map((item, index) => ({ ...item, sn: index + 1 })) : []}
              columns={columns}
            />
          </div>
        </div>
      </main>
    </>
  );
}
