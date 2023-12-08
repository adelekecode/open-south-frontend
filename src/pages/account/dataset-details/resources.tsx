import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "~/components/data-grid";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 400 },
  {
    field: "format",
    headerName: "Format",
  },
  {
    field: "size",
    headerName: "Size",
  },
  {
    field: "downloads",
    headerName: "Downloads",
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 100,
  },
];

export default function Resources() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <h2 className="text-xl font-semibold">Resources</h2>
      <div className="min-h-[500px]">
        <DataGrid rows={[]} columns={columns} />
      </div>
    </div>
  );
}
