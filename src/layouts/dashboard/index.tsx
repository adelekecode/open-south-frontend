import { Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./side-bar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="w-full min-h-screen flex flex-col">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
