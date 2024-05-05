import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Drawer, IconButton } from "@mui/material";
import {
  IoLogOutOutline,
  IoClose,
  IoPersonCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { BiLock } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import useAppStore from "~/store/app";
import CurrentUserAvatar from "~/components/current-user-avatar";

type SideBarProps = {
  routes: { to: string; name: string }[];
  open: boolean;
  setOpen: (bool: boolean) => void;
};

export default function SideBar({ routes, open, setOpen }: SideBarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { setDisplayLogoutModal } = useAppStore();

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <aside className="[@media(min-width:768px)]:hidden w-[350px] largeMobile:w-[290px] mediumMobile:!w-[250px] relative pt-20 pb-8 px-4">
        <IconButton
          className="w-fit !absolute !top-[16px] !right-[16px]"
          onClick={() => {
            setOpen(false);
          }}
        >
          <IoClose className="text-zinc-800" />
        </IconButton>
        <div className="overflow-y-auto flex flex-col gap-4">
          <div className="flex flex-col gap-4 [&_button]:rounded-full [&_button>p]:text-primary-700 [&_button]:p-2 [&_button]:py-1 [&_button>p]:text-sm [&_button>p]:font-medium [&_button]:flex [&_button]:w-fit [&_button]:items-center [&_button]:gap-2">
            {currentUser ? (
              <>
                <div className="flex items-center gap-3">
                  <CurrentUserAvatar />
                  <p className="flex items-center flex-wrap capitalize gap-1 text-sm font-medium">
                    <span>
                      {currentUser?.first_name ||
                        currentUser?.profile_data?.first_name ||
                        "-------"}
                    </span>
                    <span>
                      {currentUser?.last_name || currentUser?.profile_data?.last_name || "-------"}
                    </span>
                  </p>
                </div>
                <button
                  className="hover:bg-zinc-100"
                  onClick={() => {
                    navigate("/account/dashboard");
                  }}
                >
                  <IoSettingsOutline className="text-primary-700" />
                  <p>Dashboard</p>
                </button>
                <button
                  className="hover:bg-zinc-100"
                  onClick={() => {
                    setDisplayLogoutModal(true);
                  }}
                >
                  <IoLogOutOutline className="text-primary-700" />
                  <p>Logout</p>
                </button>
              </>
            ) : (
              <>
                <button
                  className="hover:bg-zinc-100"
                  onClick={() => {
                    navigate("/login", {
                      state: {
                        from: pathname,
                      },
                    });
                  }}
                >
                  <BiLock className="text-primary-700" />
                  <p>Log In</p>
                </button>
                <button
                  className="hover:bg-zinc-100"
                  onClick={() => {
                    navigate("/signup", {
                      state: {
                        from: pathname,
                      },
                    });
                  }}
                >
                  <IoPersonCircleOutline className="text-primary-700" />
                  <p>Sign Up</p>
                </button>
              </>
            )}
          </div>
          <div className="flex items-start flex-col w-full">
            <span className="h-[1px] w-full bg-info-300 mb-1" />
            {routes.map((item, index) => (
              <NavLink
                to={item.to}
                key={index + 1}
                className={({ isActive }) =>
                  twMerge(
                    `p-4 py-3 w-full hover:bg-zinc-100 border-b-2 border-transparent`,
                    isActive && "border-primary-700"
                  )
                }
              >
                {({ isActive }) => (
                  <p className={twMerge(`text-sm`, isActive && "text-primary-700")}>{item.name}</p>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
    </Drawer>
  );
}
