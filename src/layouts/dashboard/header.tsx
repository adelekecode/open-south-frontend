import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener, Fade, IconButton, Paper, Popper } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import CurrentUserAvatar from "~/components/current-user-avatar";
import { useCurrentUser } from "~/queries/user";
import useAppStore from "~/store/app";

export default function Header() {
  const navigate = useNavigate();

  const { setDisplayLogoutModal } = useAppStore();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLButtonElement | null>(null);

  const dropdownDisplay = Boolean(anchorEl);

  const profileDropdownDisplay = Boolean(profileAnchorEl);

  const { data: currentUser } = useCurrentUser(undefined, {
    enabled: false,
  });

  return (
    <nav className="bg-white flex items-center justify-end gap-8 tabletAndBelow:bg-white shadow-sm tabletAndBelow:!border-b p-5 py-3 px-[3.5rem] tabletAndBelow:p-5 tabletAndBelow:py-4 sticky top-0 z-[99]">
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
                        navigate("/account/datasets/new");

                        return setAnchorEl(null);
                      }}
                    >
                      Add a dataset
                    </button>
                    <button
                      className="hover:bg-info-100"
                      onClick={() => {
                        navigate("/account/organizations/new");

                        return setAnchorEl(null);
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

      <ClickAwayListener onClickAway={() => setProfileAnchorEl(null)}>
        <div>
          <button
            className="flex items-center gap-3"
            onClick={(e) => setProfileAnchorEl(profileAnchorEl ? null : e.currentTarget)}
          >
            <CurrentUserAvatar />
            <FaAngleDown className="text-info-900" />
          </button>
          <Popper
            transition
            open={profileDropdownDisplay}
            anchorEl={profileAnchorEl}
            className="z-[100] !mt-2"
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={200}>
                <Paper className="flex flex-col overflow-hidden relative !shadow min-w-[150px]">
                  <div className="p-3 py-3 border-b flex flex-col justify-center items-center gap-2">
                    <CurrentUserAvatar
                      className="!border !w-fit !p-1"
                      sx={{
                        width: 200,
                        height: 70,
                      }}
                    />
                    <p className="text-xs flex items-center gap-1">
                      <span>
                        {currentUser?.first_name ||
                          currentUser?.profile_data?.first_name ||
                          "-------"}
                      </span>
                      <span>
                        {currentUser?.last_name ||
                          currentUser?.profile_data?.last_name ||
                          "-------"}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col divide-y">
                    <button
                      className=" text-sm p-4 py-2 hover:bg-info-50"
                      onClick={() => {
                        navigate(
                          currentUser?.role === "admin" ? "/admin/profile" : "/account/profile"
                        );

                        return setProfileAnchorEl(null);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className=" text-sm p-4 py-2 hover:bg-info-50"
                      onClick={() => {
                        setDisplayLogoutModal(true);

                        return setProfileAnchorEl(null);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      </ClickAwayListener>
    </nav>
  );
}
