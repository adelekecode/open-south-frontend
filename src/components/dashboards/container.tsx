import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement> & {
  header?: ReactNode;
};

export default function Container({ children, className, header, ...props }: Props) {
  return (
    <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-4 w-full">
      {header}
      <div
        className={twMerge(
          "bg-white w-full border border-info-100 pb-8 rounded-md flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </main>
  );
}
