import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Collapse } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { IoGridOutline, IoPersonOutline, IoNewspaperOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { GoDatabase, GoOrganization } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineCategory } from "react-icons/md";
import Logo from "~/components/logo";
import OrgDropdown from "./org-dropdown";
import { useUserOrganizations } from "~/queries/organizations";

const sideBarData = [
  {
    name: "Dashboard",
    to: "/account/dashboard",
    icon: IoGridOutline,
    allowedUserType: ["user"],
  },
  {
    name: "Datasets",
    to: "/account/datasets",
    icon: GoDatabase,
    allowedUserType: ["user"],
  },
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: IoGridOutline,
    allowedUserType: ["admin"],
  },
  {
    name: "Users",
    to: "/admin/users",
    icon: HiOutlineUserGroup,
    allowedUserType: ["admin"],
  },
  {
    name: "Datasets",
    to: "/admin/datasets",
    icon: GoDatabase,
    allowedUserType: ["admin"],
  },
  {
    name: "Organizations",
    to: "/admin/organizations",
    icon: GoOrganization,
    allowedUserType: ["admin"],
  },
  {
    name: "Categories",
    to: "/admin/categories",
    icon: MdOutlineCategory,
    allowedUserType: ["admin"],
  },
  {
    name: "Profile",
    to: "/account/profile",
    icon: IoPersonOutline,
    allowedUserType: ["user"],
  },
  {
    name: "News",
    to: "/admin/news",
    icon: IoNewspaperOutline,
    allowedUserType: ["admin"],
  },
  {
    name: "Profile",
    to: "/admin/profile",
    icon: IoPersonOutline,
    allowedUserType: ["admin"],
  },
];

export default function SideBar() {
  const [orgDropDownclicked, setOrgDropDownClicked] = useState(false);

  function navLinkClassNameHandler({
    isActive,
  }: {
    isActive: boolean;
    isPending: boolean;
  }): string {
    return `flex items-center gap-4 p-4 transition-all border-primary-800 [&_span]:text-[0.8rem] ${
      isActive ? "border-l-[3px] bg-primary-100" : ""
    }`;
  }

  const { data: organizationData, isLoading } = useUserOrganizations();

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  return (
    <aside className="tabletAndBelow:!hidden z-[100] bg-white shadow min-h-screen flex flex-col w-[230px] sticky top-0 left-0 overflow-y-auto h-screen">
      <div className="py-8">
        <Link to="/" className="flex justify-center items-center w-fit mx-auto">
          <Logo />
        </Link>
      </div>
      <div className="h-[100%] overflow-auto flex flex-col gap-8">
        <div>
          {sideBarData.map((item, index) => {
            if (item.allowedUserType.includes(currentUser?.role as string)) {
              return (
                <NavLink to={item.to} key={index + 1} className={navLinkClassNameHandler}>
                  <>
                    <item.icon className={`text-base`} />
                    <span>{item.name}</span>
                  </>
                </NavLink>
              );
            }
          })}
          {currentUser?.role === "user" &&
            (isLoading ? (
              <div className="flex gap-2 flex-col pt-8 pb-4 px-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index + 1}
                    className="border w-full h-10 p-1 px-2 flex gap-3 items-center"
                  >
                    <div className="animate-pulse bg-info-200 h-full aspect-square"></div>
                    <div className="animate-pulse bg-info-200 w-[70%] h-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              organizationData &&
              organizationData.length > 0 && (
                <div className="py-4">
                  <button
                    className={`w-full grid grid-cols-[1fr,10px] items-center transition-all p-1 px-3 justify-between gap-2`}
                    onClick={() => {
                      setOrgDropDownClicked((prev) => !prev);
                    }}
                  >
                    <p className="flex items-center py-2 text-[0.8rem] font-medium">
                      Organizations
                    </p>
                    <FaAngleDown
                      className={`transition-all text-xs ${orgDropDownclicked && "rotate-180"}`}
                    />
                  </button>
                  <Collapse in={orgDropDownclicked} timeout="auto" unmountOnExit>
                    <div className="flex flex-col divide-y">
                      {organizationData.map((item, index) => (
                        <OrgDropdown
                          key={index + 1}
                          {...item}
                          navLinkClassNameHandler={navLinkClassNameHandler}
                        />
                      ))}
                    </div>
                  </Collapse>
                </div>
              )
            ))}
        </div>
      </div>
    </aside>
  );
}
