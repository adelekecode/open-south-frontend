import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";

type OrgDropdownProps = {
  name: string;
  slug: string;
};

export default function OrgDropdown({ name, slug }: OrgDropdownProps) {
  const [clicked, setClicked] = useState(false);

  function navLinkClassNameHandler({
    isActive,
  }: {
    isActive: boolean;
    isPending: boolean;
  }): string {
    return `flex items-center gap-4 p-4 py-3 transition-all border-primary-800 ${
      isActive && "border-l-[3px] bg-primary-50"
    }`;
  }

  return (
    <div className="w-full">
      <button
        className={`w-full flex items-center transition-all p-4 justify-between gap-4 ${
          clicked && "bg-info-100"
        }`}
        onClick={() => {
          setClicked((prev) => !prev);
        }}
      >
        <p>{name.length > 12 ? name.slice(0, 12) + "..." : name}</p>
        <FaAngleDown className={`transition-all ${clicked && "rotate-180"}`} />
      </button>
      <Collapse className="pl-4" in={clicked} timeout="auto" unmountOnExit>
        <NavLink to={`/account/${slug}/dashboard`} className={navLinkClassNameHandler}>
          <IoGridOutline />
          <p className="text-sm">Dashboard</p>
        </NavLink>
        <NavLink to={`/account/${slug}/datasets`} className={navLinkClassNameHandler}>
          <GoDatabase />
          <p className="text-sm">Datasets</p>
        </NavLink>
      </Collapse>
    </div>
  );
}
