import { useState, ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { GrFormNext } from "react-icons/gr";
import Footer from "~/components/footer";
import Header from "./header";
import SideBar from "./side-bar";

const routes = [
  {
    to: "/datasets",
    name: "Datasets",
  },
  {
    to: "/categories",
    name: "Categories",
  },
  {
    to: "/organizations",
    name: "Organizations",
  },
  {
    to: "/about",
    name: "About Us",
  },
  {
    to: "/news",
    name: "News",
  },
  {
    to: "/contact",
    name: "Contact Us",
  },
];

export default function AppLayout() {
  const [routePath, setRoutePath] = useState<ReactNode[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);

  const breadcrumbs = [
    <Link key="1" to="/" className="hover:underline">
      Welcome
    </Link>,
    ...routePath,
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header
        routes={routes}
        setRoutePath={(data) => setRoutePath(data)}
        setOpenSidebar={(bool: boolean) => setOpenSidebar(bool)}
      />
      <SideBar
        routes={routes}
        open={openSidebar}
        setOpen={(bool: boolean) => setOpenSidebar(bool)}
      />
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
