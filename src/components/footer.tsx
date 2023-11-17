import { Link } from "react-router-dom";
import Logo from "./logo";
import DataGouv from "~/assets/images/sponsor-logos/data-gouv.svg";
import AnalyzeBoston from "~/assets/images/sponsor-logos/analyze-boston.svg";
import Dribbble from "~/assets/images/sponsor-logos/dribbble.svg";

export default function Footer() {
  return (
    <footer className="w-full max-w-maxAppWidth mx-auto">
      <div className="bg-[#f4f4f5b3] px-6 py-8 [&_h3]:text-base [&_h3]:font-semibold grid grid-cols-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-4 [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-2 [&>div>div>a]:w-fit tablet:grid-cols-2 tablet:gap-8">
        <div>
          <h3>Useful Links</h3>
          <div>
            <Link className="hover:underline" to="/categories">
              Categories
            </Link>
            <Link className="hover:underline" to="/organizations">
              Organizations
            </Link>
          </div>
        </div>
        <div>
          <h3>Social Media</h3>
          <div>
            <Link className="hover:underline" to="/contact">
              Contact
            </Link>
            <Link className="hover:underline" to="/faq">
              FAQ
            </Link>
            <Link className="hover:underline" to="/about">
              About us
            </Link>
          </div>
        </div>
        <div>
          <h3>Social Media</h3>
          <div>
            <a className="hover:underline" href="">
              Twitter
            </a>
            <a className="hover:underline" href="">
              LinkedIn
            </a>
          </div>
        </div>
        <div>
          <h3>Developer</h3>
          <div>
            <Link className="hover:underline" to="">
              Portal API
            </Link>
          </div>
        </div>
      </div>
      <div className="px-6 w-full border-b-[1.5px] border-zinc-200 flex items-center justify-center">
        <div className=" w-full max-w-maxAppWidth flex items-end justify-between gap-4 p-4 px-6">
          <Link to={"/"} className="p-6 w-fit hover:bg-zinc-100">
            <Logo className="w-[10rem]" />
          </Link>
          <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 gap-6 [&_img]:max-w-12">
            <img src={DataGouv} alt="sponsor-logo" />
            <img src={AnalyzeBoston} alt="sponsor-logo" />
            <img src={Dribbble} alt="sponsor-logo" />
          </div>
        </div>
      </div>
      <div className="px-6 flex items-center py-3">
        <div className="flex gap-4 items-center [&>span]:h-4 [&>span]:w-[1px] [&>span]:rounded-full [&>span]:bg-zinc-300 [&>a]:text-xs">
          <Link to="/terms" className="hover:underline">
            Terms of Services
          </Link>
          <span></span>
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <span></span>
          <Link to="/accessibility" className="hover:underline">
            Accessibility: partially compliant
          </Link>
        </div>
      </div>
    </footer>
  );
}
