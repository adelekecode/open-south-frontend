import { DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps } from "@mui/x-data-grid";
import NoData from "~/assets/illustrations/no-data.png";

type DataGridProps = MuiDataGridProps;

export default function DataGrid({ sx, initialState, slots, ...props }: DataGridProps) {
  return (
    <MuiDataGrid
      {...props}
      sx={{
        overflowX: "auto",
        ...sx,
      }}
      slots={{
        noRowsOverlay: () => {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <figure className="w-[300px] largeMobile:w-[80%] aspect-square">
                <img
                  src={NoData}
                  className="object-cover w-full h-full"
                  alt="no data illustration"
                />
              </figure>
            </div>
          );
        },
        ...slots,
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        ...initialState,
      }}
      pageSizeOptions={[5, 10, 100]}
      disableColumnMenu
      disableRowSelectionOnClick
    />
  );
}
