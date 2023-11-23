import { Link } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Logo from "./logo";
import DataGouv from "~/assets/images/sponsor-logos/data-gouv.svg";
import AnalyzeBoston from "~/assets/images/sponsor-logos/analyze-boston.svg";
import Dribbble from "~/assets/images/sponsor-logos/dribbble.svg";

export default function Footer() {
  return (
    <footer className="w-full max-w-maxAppWidth mx-auto">
      <div className="bg-[#f4f4f5b3] px-6 largeMobile:px-4 py-8 [&_h3]:text-[0.8rem] [&_h3]:font-semibold grid grid-cols-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-4 [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-4 [&>div>div>a]:w-fit [&>div>div>a]:text-[0.8rem] tablet:grid-cols-2 largeMobile:!grid-cols-1 tablet:gap-8">
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
          <h3>Support</h3>
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
            <a
              className="hover:underline"
              href="https://tally.so/r/w2KPR9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </a>
          </div>
        </div>
        <div>
          <h3>Social Media</h3>
          <div className="flex items-start">
            <a href="" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter className="text-2xl text-black" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl text-[#0a66c2]" />
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
      <div className="px-6 tablet:px-0 w-full border-b-[1.5px] border-zinc-200 flex items-center justify-center">
        <div className=" w-full max-w-maxAppWidth flex [@media(max-width:580px)]:grid [@media(max-width:580px)]:grid-cols-1 largeMobile:!grid-cols-1 largeMobile:gap-8 items-end justify-between gap-4 p-4 px-6 [@media(max-width:580px)]:px-4">
          <Link to={"/"} className="p-6 [@media(max-width:580px)]:p-4 w-fit hover:bg-zinc-100">
            <Logo className="w-40 [@media(max-width:580px)]:w-36 largeMobile:!w-32" />
          </Link>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-center">Our Sponsors</p>
            <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:580px)]:!flex [@media(max-width:580px)]:flex-wrap gap-6 [&>img]:max-w-[10rem]">
              <img src={DataGouv} alt="sponsor-logo" />
              <img src={AnalyzeBoston} alt="sponsor-logo" />
              <img src={Dribbble} alt="sponsor-logo" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 flex items-center py-3">
        <div className="flex gap-4 items-center [&>span]:h-4 [&>span]:w-[1px] [&>span]:rounded-full [&>span]:bg-zinc-300 [&>a]:text-xs flex-wrap">
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
