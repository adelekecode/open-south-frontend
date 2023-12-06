import { Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./side-bar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <main className="min-h-screen flex flex-col w-[calc(100%-250px)] tabletAndBelow:w-full">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
