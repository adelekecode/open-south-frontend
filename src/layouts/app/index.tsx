import { Link, Outlet } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { GrFormNext } from "react-icons/gr";
import Footer from "~/components/footer";
import Header from "./header";
import useAppStore from "~/store/app";

const AppLayout = () => {
  const { currentPageName } = useAppStore();

  const breadcrumbs = [
    <Link key="1" to={"/"} className="text-sm hover:underline font-medium">
      Welcome
    </Link>,
    <p key={"2"} className="capitalize">
      {currentPageName}
    </p>,
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {currentPageName && (
          <div className="flex items-center max-w-maxAppWidth mx-auto p-6 px-10 tablet:px-6 largeMobile:!px-4">
            <Breadcrumbs separator={<GrFormNext />}>{breadcrumbs}</Breadcrumbs>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
