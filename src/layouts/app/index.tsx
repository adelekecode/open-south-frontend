import { Outlet } from "react-router-dom";
import Footer from "~/components/footer";
import Header from "./header";

const AppLayout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
