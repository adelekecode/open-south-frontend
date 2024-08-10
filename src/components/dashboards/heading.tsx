import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLHeadingElement>;

export default function Heading({ children, className, ...props }: Props) {
  return (
    <h1 className={twMerge("text-2xl font-semibold largeMobile:text-xl", className)} {...props}>
      {children}
    </h1>
  );
}
