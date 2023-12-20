import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Collapse } from "@mui/material";
import { IoGridOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { GoDatabase } from "react-icons/go";
import Logo from "~/components/logo";
import OrganizationData from "~/utils/data/organization.json";
import OrgDropdown from "./org-dropdown";

export default function SideBar() {
  const [orgDropDownclicked, setOrgDropDownClicked] = useState(false);

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
      <aside className="tabletAndBelow:!hidden bg-info-50 border-r border-info-300 min-h-screen flex flex-col w-[230px] sticky top-0 left-0 overflow-y-auto h-screen">
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
              <button
                className={`w-full grid grid-cols-[1fr,10px] items-center transition-all p-1 px-3 justify-between gap-2`}
                onClick={() => {
                  setOrgDropDownClicked((prev) => !prev);
                }}
              >
                <p className="flex items-center py-2 text-sm font-medium">Organizations</p>
                <FaAngleDown
                  className={`transition-all text-xs ${orgDropDownclicked && "rotate-180"}`}
                />
              </button>
              <Collapse in={orgDropDownclicked} timeout="auto" unmountOnExit>
                <div className="flex flex-col divide-y">
                  {OrganizationData.map((item, index) => (
                    <OrgDropdown key={index + 1} {...item} />
                  ))}
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
