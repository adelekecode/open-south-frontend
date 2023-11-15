import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="px-6 w-full max-w-maxAppWidth mx-auto">
      <div className="w-full border-b-[1.5px] border-zinc-200 flex items-center justify-center">
        <div className=" w-full max-w-maxAppWidth flex items-center justify-between gap-4 p-4 px-6">
          <Link to={"/"} className="p-6 w-fit hover:bg-zinc-100">
            <Logo className="w-[10rem]" />
          </Link>
        </div>
      </div>
      <div className="flex items-center py-3">
        <div className="flex gap-4 items-center [&>span]:h-4 [&>span]:w-[1px] [&>span]:rounded-full [&>span]:bg-zinc-300 [&>a]:text-xs">
          <Link to="/licences" className="hover:underline">
            Licienses
          </Link>
          <span></span>
          <Link to="/terms" className="hover:underline">
            Terms of Services
          </Link>
          <span></span>
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
