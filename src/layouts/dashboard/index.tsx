import { useState } from "react";
import Header from "./header";
import SideBar from "./side-bar";
import MobileSidebar from "./mobile-sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFBFF]">
      <SideBar />
      <MobileSidebar open={showDrawer} closeDrawer={() => setShowDrawer(false)} />
      <main className="min-h-screen flex flex-col w-[calc(100%-230px)] tabletAndBelow:w-full">
        <Header showDrawerHandler={() => setShowDrawer((prev) => !prev)} />
        {children}
      </main>
    </div>
  );
}
