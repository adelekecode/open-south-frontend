import type { Dispatch, ReactElement, SetStateAction } from "react";
import { ClickAwayListener, Fade, IconButton, Paper, Popper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { GoKebabHorizontal } from "react-icons/go";

type DateColumnParams = Partial<GridColDef> & {
  field: string;
  headerName: string;
  dateFormat?: "Do MMM, YYYY" | "fromNow" | string;
};

type MenuObj = {
  [key: string]: HTMLButtonElement | null;
};

type PaperContentProps = {
  row: any;
  handleClose: () => void;
};

export const createDateColumn = ({
  field,
  headerName,
  dateFormat = "Do MMM, YYYY",
  minWidth = 180,
  flex = 1,
  ...rest
}: DateColumnParams): GridColDef => {
  return {
    field,
    headerName,
    minWidth,
    valueFormatter: ({ value }) => {
      if (dateFormat === "fromNow") {
        const result = moment(value).fromNow();

        if (result === "a day ago") {
          return "Yesterday";
        }

        return result.charAt(0).toUpperCase() + result.slice(1);
      }

      return moment(value).format("MMMM D, YYYY");
    },
    sortComparator: (v1: string, v2: string) => {
      return new Date(v1).getTime() - new Date(v2).getTime();
    },
    flex,
    ...rest,
  };
};

export const createEmailColumn = ({
  field = "email",
  headerName = "Email",
  minWidth = 250,
  flex = 1,
  ...rest
}: Partial<GridColDef> = {}): GridColDef => {
  return {
    field,
    headerName,
    minWidth,
    flex,
    renderCell: (params) => {
      return (
        <a
          className="hover:underline hover:text-primary-600 text-center whitespace-nowrap"
          href={`mailto:${params.value}`}
        >
          {params.value}
        </a>
      );
    },
    ...rest,
  };
};

export const createColumn = ({
  field,
  headerName,
  minWidth = 250,
  flex = 1,
  cellClassName = "capitalize",
  ...rest
}: GridColDef): GridColDef => {
  return {
    field,
    headerName,
    minWidth,
    flex,
    cellClassName,
    ...rest,
  };
};

export const createIdColumn = (
  paginationModel: {
    page: number;
    pageSize: number;
  },
  { field = "id", headerName = "no.", ...rest }: Partial<GridColDef> = {}
): GridColDef => {
  return {
    field,
    headerName,
    minWidth: 10,
    renderCell: ({ api, row }) => {
      const { page, pageSize } = paginationModel;
      const { getAllRowIds } = api;

      return getAllRowIds().indexOf(row.id) + 1 + page * pageSize;
    },
    ...rest,
  };
};

export const createStateColumn = ({ field, headerName, ...rest }: GridColDef): GridColDef => {
  return {
    field,
    headerName,
    minWidth: 100,
    flex: 1,
    cellClassName: "[&_p]:py-1 [&_p]:px-2 [&_p]:!rounded-full [&_p]:text-xs",
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => {
      if (value) {
        return <p className={`text-green-500 border border-green-500`}>True</p>;
      }

      return <p className={`text-amber-500 border border-amber-500`}>False</p>;
    },
    ...rest,
  };
};

export const createDatasetStatusColumn = ({
  field,
  headerName,
  ...rest
}: GridColDef): GridColDef => {
  return {
    field,
    headerName,
    flex: 1,
    cellClassName: "[&_p]:py-1 [&_p]:px-2 [&_p]:!rounded-full [&_p]:text-xs [&_p]:border",
    sortable: false,
    minWidth: 130,
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => {
      if (value === "published") {
        return <p className={`text-green-500 border-green-500`}>Published</p>;
      }

      if (value === "unpublished") {
        return <p className={`text-info-500 border-info-500`}>Unpublished</p>;
      }

      if (value === "rejected") {
        return <p className={`text-red-500 border-red-500`}>Rejected</p>;
      }

      if (value === "further_review") {
        return <p className={`text-info-800 border-info-800`}>Further Review</p>;
      }

      return <p className={`text-orange-500 border-orange-500`}>Pending</p>;
    },
    ...rest,
  };
};

export const createMenuColumn = ({ ...rest }: Partial<GridColDef>): GridColDef => {
  return {
    field: "_",
    headerName: "",
    minWidth: 60,
    align: "center",
    sortable: false,
    ...rest,
  };
};

export const createRenderCell =
  (
    menuObj: MenuObj,
    setMenuObj: Dispatch<SetStateAction<MenuObj>>,
    PaperContent: (props: PaperContentProps) => ReactElement
  ) =>
  ({ row }: { row: any }) => {
    const anchorEl = menuObj[row.id];

    function handleClick(target: HTMLButtonElement) {
      setMenuObj({
        [row.id]: target,
      });
    }

    function handleClose() {
      setMenuObj({
        [row.id]: null,
      });
    }

    const open = Boolean(anchorEl);

    return (
      <>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            if (menuObj[row.id]) {
              return handleClose();
            }

            handleClick(e.currentTarget);
          }}
        >
          <GoKebabHorizontal className="rotate-180" />
        </IconButton>
        <ClickAwayListener onClickAway={handleClose}>
          <Popper open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Paper>
                  <PaperContent row={row} handleClose={handleClose} />
                </Paper>
              </Fade>
            )}
          </Popper>
        </ClickAwayListener>
      </>
    );
  };
