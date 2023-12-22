import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ClickAwayListener, Fade, IconButton, Paper, Popper } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import CurrentUserAvatar from "~/components/current-user-avatar";

export default function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const dropdownDisplay = Boolean(anchorEl);

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  return (
    <nav className="bg-info-50 flex items-center justify-end gap-8 tabletAndBelow:bg-white border-l-0 border-b border-info-300 tabletAndBelow:!border-b p-5 py-3 px-[3.5rem] tabletAndBelow:p-5 tabletAndBelow:py-4 sticky top-0 z-[99]">
      {currentUser?.role === "user" && (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div>
            <IconButton onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>
              <IoMdAdd />
            </IconButton>
            <Popper transition open={dropdownDisplay} anchorEl={anchorEl} className="z-[100] !mt-2">
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={200}>
                  <Paper className="flex flex-col [&>button]:p-4 [&>button]:text-sm [&>button]:py-3 overflow-hidden relative divide-y !shadow">
                    <button
                      className="hover:bg-info-100"
                      onClick={() => {
                        setAnchorEl(null);
                        navigate("/account/datasets/new");
                      }}
                    >
                      Add a dataset
                    </button>
                    <button
                      className="hover:bg-info-100"
                      onClick={() => {
                        setAnchorEl(null);
                        navigate("/account/organizations/new");
                      }}
                    >
                      Add an organization
                    </button>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        </ClickAwayListener>
      )}

      {currentUser?.role === "admin" && (
        <span className="text-sm font-medium text-primary-600 p-4 py-1 rounded-full border border-primary-700 bg-primary-50">
          Admin
        </span>
      )}

      <button className="flex items-center gap-3">
        <CurrentUserAvatar />
        <p className="flex items-center gap-1 capitalize text-sm font-medium largeMobile:hidden">
          <span>
            {currentUser?.first_name || currentUser?.profile_data?.first_name || "-------"}
          </span>{" "}
          <span>{currentUser?.last_name || currentUser?.profile_data?.last_name || "-------"}</span>
        </p>
      </button>
    </nav>
  );
}
