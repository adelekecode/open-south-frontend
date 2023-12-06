import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { IoGridOutline } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";
import { logout } from "~/utils/api/logout";
import Logo from "~/components/logo";
import OrgDropdown from "./org-dropdown";

export default function SideBar() {
  function navLinkClassNameHandler({
    isActive,
  }: {
    isActive: boolean;
    isPending: boolean;
  }): string {
    return `flex items-center gap-4 p-4 transition-all border-primary-800 ${
      isActive && "border-l-[3px] bg-primary-100"
    }`;
  }

  return (
    <div>
      <aside className="tabletAndBelow:!hidden bg-info-50 border-r border-info-300 min-h-screen flex flex-col w-[250px] sticky top-0 left-0 overflow-y-auto h-screen">
        <Link to="/" className="flex justify-center items-center w-full py-8">
          <Logo />
        </Link>
        <div className="h-[100%] overflow-auto flex flex-col gap-8">
          <div>
            <NavLink to={"/account/dashboard"} className={navLinkClassNameHandler}>
              <IoGridOutline />
              <p className="text-sm">Dashboard</p>
            </NavLink>
            <NavLink to={"/account/datasets"} className={navLinkClassNameHandler}>
              <GoDatabase />
              <p className="text-sm">Datasets</p>
            </NavLink>
            <div className="py-4">
              <p className="flex items-center px-8 py-2 text-sm font-medium">Organizations</p>
              <div className="flex flex-col">
                {[
                  {
                    name: "Netflix",
                    slug: "netflix",
                  },
                ].map((item, index) => (
                  <OrgDropdown key={index + 1} {...item} />
                ))}
              </div>
            </div>
          </div>
          <Button startIcon={<IoLogOutOutline />} onClick={logout}>
            Log out
          </Button>
        </div>
      </aside>
    </div>
  );
}
