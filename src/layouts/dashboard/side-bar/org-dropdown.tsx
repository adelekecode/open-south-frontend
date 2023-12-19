import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";

type OrgDropdownProps = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

export default function OrgDropdown({ name, slug, image }: OrgDropdownProps) {
  const [clicked, setClicked] = useState(false);

  function navLinkClassNameHandler({
    isActive,
  }: {
    isActive: boolean;
    isPending: boolean;
  }): string {
    return `flex items-center gap-4 p-4 py-3 transition-all border-primary-800 ${
      isActive && "border-l-[3px] bg-primary-100"
    }`;
  }

  return (
    <div className="w-full">
      <button
        className={`w-full grid grid-cols-[1fr,10px] items-center transition-all p-4 py-2 justify-between gap-2 ${
          clicked && "bg-info-200"
        }`}
        onClick={() => {
          setClicked((prev) => !prev);
        }}
      >
        <div className="grid grid-cols-[30px,1fr,12px] items-center gap-1">
          <figure className="w-full aspect-square p-[1px] border bg-white">
            <img src={image} alt="company logo" className="w-full h-full object-contain" />
          </figure>
          <p className="text-sm overflow-x-hidden whitespace-nowrap">{name}</p>
          <span className="w-full pr-1">...</span>
        </div>
        <FaAngleDown className={`transition-all text-xs ${clicked && "rotate-180"}`} />
      </button>
      <Collapse className="pl-2" in={clicked} timeout="auto" unmountOnExit>
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
