import { useState, type ReactNode, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@mui/material";
import { GrFormNext } from "react-icons/gr";
import Footer from "~/components/footer";
import Header from "./header";
import SideBar from "./side-bar";

const routes = [
  {
    to: "/datasets",
    nameKey: "dataset",
  },
  {
    to: "/categories",
    nameKey: "category",
  },
  {
    to: "/organizations",
    nameKey: "organization",
  },
  {
    to: "/about",
    nameKey: "about",
  },
  {
    to: "/news",
    nameKey: "news",
  },
  {
    to: "/partners",
    nameKey: "partner",
  },
  {
    to: "/contact",
    nameKey: "contact",
  },
];

export default function AppLayout() {
  const { t } = useTranslation("layout");

  const [routePath, setRoutePath] = useState<ReactNode[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);

  const localizedRoutes = useMemo(
    () =>
      routes.map((route) => ({
        ...route,
        name: t(`header.links.${route.nameKey}`),
      })),
    [t]
  );

  const headerProps = {
    routes: localizedRoutes,
    setRoutePath: (data: ReactNode[]) => setRoutePath(data),
    setOpenSidebar: (bool: boolean) => setOpenSidebar(bool),
  };

  const sidebarProps = {
    routes: localizedRoutes,
    open: openSidebar,
    setOpen: (bool: boolean) => setOpenSidebar(bool),
  };

  const breadcrumbs = useMemo(
    () => [
      <Link key="1" to="/" className="hover:underline">
        Welcome
      </Link>,
      ...routePath,
    ],
    [routePath]
  );

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header {...headerProps} />
      <SideBar {...sidebarProps} />
      <main className="flex-grow">
        {routePath.length > 0 && (
          <div className="flex items-center max-w-maxAppWidth mx-auto p-6 px-10 tablet:px-6 largeMobile:!px-4">
            <Breadcrumbs
              separator={<GrFormNext />}
              className="[&_p]:text-xs [&_p]:font-medium [&_a]:text-xs [&_a]:font-medium"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
