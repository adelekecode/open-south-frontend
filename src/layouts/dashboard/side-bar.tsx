import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { IoGridOutline } from "react-icons/io5";
import { logout } from "~/utils/api/logout";
import Logo from "~/components/logo";

export default function SideBar() {
  return (
    <aside className="tabletAndBelow:!hidden bg-background border-r border-grey min-h-screen flex flex-col gap-5 w-[250px] sticky top-0 left-0 overflow-y-auto h-screen">
      <Link to="/" className="flex justify-center items-center w-full py-8">
        <Logo />
      </Link>
      <div className="h-[100%] overflow-auto flex flex-col gap-8">
        <div>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4  transition-all border-primary-800 ${
                isActive && "border-l-[3px] bg-primary-50"
              }`
            }
          >
            <IoGridOutline />
            <p className="text-sm">Dashboard</p>
          </NavLink>
        </div>
        <Button startIcon={<IoLogOutOutline />} onClick={logout}>
          Log out
        </Button>
      </div>
    </aside>
  );
}
