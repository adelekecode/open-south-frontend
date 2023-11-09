import { Outlet } from "react-router-dom";
import RightSide from "./right-side";
import Logo from "~/components/logo";

export default function Auth() {
  return (
    <>
      <main className={"grid grid-cols-2 min-h-screen authTablet:grid-cols-1"}>
        <div className="w-full flex justify-end items-center py-14 authTablet:justify-center authTablet:py-4 authTablet:pt-16 relative">
          <div className="absolute top-0 left-0 p-6">
            <Logo />
          </div>
          <div className="authDesktop:!max-w-[945px] w-full flex flex-col justify-center items-center largeMobile:px-4">
            <Outlet />
          </div>
        </div>
        <RightSide />
      </main>
    </>
  );
}
