import type { Dispatch, ReactElement, SetStateAction } from "react";
import { ClickAwayListener, Fade, IconButton, Paper, Popper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FaXmark } from "react-icons/fa6";
import { GoKebabHorizontal } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";

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

export const createActiveColumn = ({ ...rest }: Partial<GridColDef> = {}): GridColDef => {
  return {
    field: "is_active",
    headerName: "Active",
    minWidth: 100,
    flex: 1,
    renderCell: ({ value }) => {
      return (
        <div className="flex items-center h-full">
          {value ? (
            <IoCheckmark className="text-green-700" />
          ) : (
            <FaXmark className="text-red-700" />
          )}
        </div>
      );
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
      setMenuObj((prevMenuObj) => ({
        ...prevMenuObj,
        [row.id]: target,
      }));
    }

    function handleClose() {
      setMenuObj((prevMenuObj) => ({
        ...prevMenuObj,
        [row.id]: null,
      }));
    }

    const open = Boolean(anchorEl);

    return (
      <>
        <IconButton size="small" onClick={(e) => handleClick(e.currentTarget)}>
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
