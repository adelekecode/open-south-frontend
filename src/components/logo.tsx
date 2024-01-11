import { twMerge } from "tailwind-merge";
import _logo from "~/assets/logo.svg";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return <img src={_logo} alt="Open-South-logo" className={twMerge(`w-[8rem]`, `${className}`)} />;
}
