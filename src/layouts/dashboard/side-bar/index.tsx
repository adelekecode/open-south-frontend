import { Link } from "react-router-dom";
import Logo from "~/components/logo";
import SidebarLinks from "../sidebar-links";

export default function SideBar() {
  return (
    <aside className="tabletAndBelow:!hidden z-[100] bg-white shadow min-h-screen flex flex-col w-[230px] sticky top-0 left-0 overflow-y-auto h-screen">
      <div className="py-8">
        <Link to="/" className="flex justify-center items-center w-fit mx-auto">
          <Logo />
        </Link>
      </div>
      <SidebarLinks />
    </aside>
  );
}
