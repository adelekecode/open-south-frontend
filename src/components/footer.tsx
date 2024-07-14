import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Logo from "./logo";
import BIDS from "~/assets/images/partner-logos/bids.png";
import CHAI from "~/assets/images/partner-logos/chai.png";
import EAAMO from "~/assets/images/partner-logos/eaamo.png";

export default function Footer() {
  const { t } = useTranslation("layout");

  return (
    <footer className="w-full">
      <div className="bg-[#f4f4f5b3] w-full">
        <div className="max-w-maxAppWidth mx-auto px-8 tablet:px-6 largeMobile:!px-4 py-8 [&_h3]:text-[0.8rem] [&_h3]:font-semibold grid grid-cols-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-4 [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-4 [&>div>div>a]:w-fit [&>div>div>a]:text-[0.8rem] tablet:grid-cols-2 largeMobile:!grid-cols-1 tablet:gap-8">
          <div>
            <h3>{t("footer.links.useful-links.title")}</h3>
            <div>
              <Link className="hover:underline" to="/categories">
                {t("footer.links.useful-links.body.categories")}
              </Link>
              <Link className="hover:underline" to="/organizations">
                {t("footer.links.useful-links.body.organizations")}
              </Link>
            </div>
          </div>
          <div>
            <h3>{t("footer.links.support.title")}</h3>
            <div>
              <Link className="hover:underline" to="/contact">
                {t("footer.links.support.body.contact")}
              </Link>
              <Link className="hover:underline" to="/faq">
                {t("footer.links.support.body.faq")}
              </Link>
              <Link className="hover:underline" to="/about">
                {t("footer.links.support.body.about-us")}
              </Link>
              <a
                className="hover:underline"
                href="https://tally.so/r/w2KPR9"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.links.support.body.feedback")}
              </a>
            </div>
          </div>
          <div>
            <h3>{t("footer.links.social-media.title")}</h3>
            <div className="!flex-row">
              <a href="https://twitter.com/OpenSouthData" target="_blank" rel="noopener noreferrer">
                <FaSquareXTwitter className="text-2xl text-black" />
              </a>
              <a
                href="https://www.linkedin.com/company/100535350"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl text-[#0a66c2]" />
              </a>
            </div>
          </div>
          <div>
            <h3>{t("footer.links.developer.title")}</h3>
            <div>
              <a
                className="hover:underline"
                href={import.meta.env.VITE_OPEN_SOUTH_DEVELOPER_DOCS}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.links.developer.body.portal-api")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-maxAppWidth mx-auto px-6 tablet:px-0 w-full border-b-[1.5px] border-zinc-200 flex items-center justify-center">
        <div className=" w-full max-w-maxAppWidth flex [@media(max-width:580px)]:grid [@media(max-width:580px)]:grid-cols-1 largeMobile:!grid-cols-1 largeMobile:gap-8 items-end justify-between gap-4 p-4 px-6 [@media(max-width:580px)]:px-4">
          <Link to={"/"} className="p-6 [@media(max-width:580px)]:p-4 w-fit hover:bg-zinc-100">
            <Logo className="w-40 [@media(max-width:580px)]:w-36 largeMobile:!w-32" />
          </Link>
          <div className="flex flex-col gap-4 max-w-[70%] [@media(max-width:580px)]:max-w-[none]">
            <p className="text-sm font-medium text-center">{t("footer.partners.title")}</p>
            <div className="flex flex-wrap [@media(max-width:960px)]:grid [@media(max-width:960px)]:grid-cols-2 gap-6 largeMobile:flex largeMobile:flex-wrap [&_div]:flex [&_img]:h-[4rem] [&_img]:min-w-[4rem]">
              <div className="justify-end">
                <a href="https://humancompatible.ai" target="_blank" rel="noopener noreferrer">
                  <img src={CHAI} alt="CHAI logo" />
                </a>
              </div>
              <div className="justify-start">
                <a href="https://bids.berkeley.edu" target="_blank" rel="noopener noreferrer">
                  <img src={BIDS} alt="BIDS logo" />
                </a>
              </div>
              <div className="justify-center [@media(max-width:960px)]:col-span-2 [@media(max-width:960px)]:pr-[20%] largeMobile:pr-0">
                <a
                  href="https://www.eaamo.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <img src={EAAMO} alt="EAAMO logo" className="!h-[2.2rem]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 flex items-center py-3 max-w-maxAppWidth mx-auto">
        <div className="flex gap-4 items-center [&>span]:h-4 [&>span]:w-[1px] [&>span]:rounded-full [&>span]:bg-zinc-300 [&>a]:text-xs flex-wrap">
          <Link to="/terms" className="hover:underline">
            {t("footer.bottom.terms")}
          </Link>
          <span></span>
          <Link to="/privacy-policy" className="hover:underline">
            {t("footer.bottom.policy")}
          </Link>
          <span></span>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs">{t("footer.bottom.license")}</p>
            <a
              href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
              target="_blank"
              rel="license noopener noreferrer"
              className="flex items-center gap-2 text-xs hover:underline text-orange-600 font-medium"
            >
              CC BY-NC-ND 4.0
            </a>
            <div className="flex items-center gap-1 [&_img]:w-4">
              <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

{
  /* <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title">Open South</span> is licensed under </p> */
}
