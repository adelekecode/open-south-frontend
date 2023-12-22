import Header from "./header";
import SideBar from "./side-bar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <main className="min-h-screen flex flex-col w-[calc(100%-230px)] tabletAndBelow:w-full">
        <Header />
        {children}
      </main>
    </div>
  );
}
