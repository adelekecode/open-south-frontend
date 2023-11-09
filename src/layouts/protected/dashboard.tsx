import { Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./side-bar";

export default function DashboardLayout() {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
}
