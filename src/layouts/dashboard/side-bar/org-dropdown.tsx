import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { IoGridOutline, IoPersonOutline } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";
import { twMerge } from "tailwind-merge";

type OrgDropdownProps = Organization & {
  navLinkClassNameHandler: (obj: { isActive: boolean; isPending: boolean }) => string;
};

const links = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: IoGridOutline,
  },
  {
    name: "Dataset",
    to: "/datasets",
    icon: GoDatabase,
  },
  {
    name: "User",
    to: "/users",
    icon: IoPersonOutline,
  },
];

export default function OrgDropdown({
  name,
  slug,
  logo,
  navLinkClassNameHandler,
}: OrgDropdownProps) {
  const [clicked, setClicked] = useState(false);

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
            <img src={logo} alt={`${name} logo`} className="w-full h-full object-contain" />
          </figure>
          <p className="overflow-x-hidden text-start whitespace-nowrap text-[0.8rem]">{name}</p>
          {name.length > 20 && <span className="w-full pr-1">...</span>}
        </div>
        <FaAngleDown className={`transition-all text-xs ${clicked && "rotate-180"}`} />
      </button>
      <Collapse className="pl-2" in={clicked} timeout="auto" unmountOnExit>
        {links.map((item, index) => (
          <NavLink
            key={index + 1}
            to={`/account/${slug}${item.to}`}
            className={({ isActive, isPending }) => {
              return twMerge(navLinkClassNameHandler({ isActive, isPending }), "py-3");
            }}
          >
            <item.icon />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </Collapse>
    </div>
  );
}
