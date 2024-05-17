import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Collapse } from "@mui/material";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { IoGridOutline, IoPersonOutline, IoNewspaperOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { GoDatabase, GoOrganization } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineCategory } from "react-icons/md";
import { useUserOrganizations } from "~/queries/organizations";
import OrgDropdown from "./side-bar/org-dropdown";

const sideBarData = [
  {
    name: "dashboard",
    to: "/account/dashboard",
    icon: IoGridOutline,
    allowedUserType: ["user"],
  },
  {
    name: "datasets",
    to: "/account/datasets",
    icon: GoDatabase,
    allowedUserType: ["user"],
  },
  {
    name: "dashboard",
    to: "/admin/dashboard",
    icon: IoGridOutline,
    allowedUserType: ["admin"],
  },
  {
    name: "users",
    to: "/admin/users",
    icon: HiOutlineUserGroup,
    allowedUserType: ["admin"],
  },
  {
    name: "datasets",
    to: "/admin/datasets",
    icon: GoDatabase,
    allowedUserType: ["admin"],
  },
  {
    name: "organizations",
    to: "/admin/organizations",
    icon: GoOrganization,
    allowedUserType: ["admin"],
  },
  {
    name: "categories",
    to: "/admin/categories",
    icon: MdOutlineCategory,
    allowedUserType: ["admin"],
  },
  {
    name: "profile",
    to: "/account/profile",
    icon: IoPersonOutline,
    allowedUserType: ["user"],
  },
  {
    name: "news",
    to: "/admin/news",
    icon: IoNewspaperOutline,
    allowedUserType: ["admin"],
  },
  {
    name: "profile",
    to: "/admin/profile",
    icon: IoPersonOutline,
    allowedUserType: ["admin"],
  },
];

function navLinkClassNameHandler({ isActive }: { isActive: boolean; isPending: boolean }): string {
  return `flex items-center gap-4 p-4 transition-all border-primary-800 [&_span]:text-[0.8rem] ${
    isActive ? "border-l-[3px] bg-primary-100" : ""
  }`;
}

export default function SidebarLinks({ wrapperClassName }: { wrapperClassName?: string }) {
  const { t } = useTranslation("dashboard-layout");

  const [orgDropdownClicked, setOrgDropdownClicked] = useState(false);

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  const { data: organizationData, isLoading } = useUserOrganizations({
    enabled: currentUser?.role === "user",
  });

  return (
    <div className={twMerge("overflow-auto flex flex-col gap-8", wrapperClassName)}>
      <div>
        {sideBarData.map((item, index) => {
          if (item.allowedUserType.includes(currentUser?.role as string)) {
            return (
              <NavLink to={item.to} key={index + 1} className={navLinkClassNameHandler}>
                <>
                  <item.icon className={`text-base`} />
                  <span>{t(`sidebar.${item.name}`)}</span>
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
                    setOrgDropdownClicked((prev) => !prev);
                  }}
                >
                  <p className="text-start py-2 text-[0.8rem] font-medium">
                    {t("sidebar.organization-dropdown.title")}
                  </p>
                  <FaAngleDown
                    className={`transition-all text-xs ${orgDropdownClicked && "rotate-180"}`}
                  />
                </button>
                <Collapse in={orgDropdownClicked} timeout="auto" unmountOnExit>
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
  );
}
