import { Outlet } from "react-router-dom";
import Header from "./header";

const AppLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
