import { useTranslation } from "react-i18next";
import { DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps } from "@mui/x-data-grid";
import { twMerge } from "tailwind-merge";
import NoData from "~/assets/illustrations/no-data.png";

type DataGridProps = MuiDataGridProps;

export default function DataGrid({
  sx,
  initialState,
  pageSizeOptions = [5, 10, 100],
  disableColumnMenu = true,
  disableRowSelectionOnClick = true,
  slots,
  className,
  ...props
}: DataGridProps) {
  const { t } = useTranslation("components/table");

  return (
    <MuiDataGrid
      {...props}
      sx={{
        overflowX: "auto",
        flex: 1,
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#ededed96",
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            fontSize: "0.8rem",
            textTransform: "uppercase",
          },
        },
        "& .MuiDataGrid-overlayWrapper": {
          // height: "500px",
          minHeight: "500px",
        },
        ...sx,
      }}
      className={twMerge(`!shadow-none !min-h-[500px]`, className)}
      slots={{
        noRowsOverlay: () => {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <figure className="w-[300px] largeMobile:w-[80%] aspect-square">
                <img
                  src={NoData}
                  className="object-cover w-full h-full"
                  alt={t("empty-state.alt")}
                />
              </figure>
            </div>
          );
        },
        ...slots,
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 10, page: 0 } },
        ...initialState,
      }}
      pageSizeOptions={pageSizeOptions}
      disableColumnMenu={disableColumnMenu}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
    />
  );
}
