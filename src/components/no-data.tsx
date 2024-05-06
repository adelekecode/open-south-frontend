import { twMerge } from "tailwind-merge";
import NoDataImage from "~/assets/illustrations/no-data.png";

type NoDataProps = {
  text: string;
  containerClassName?: string;
  textClassName?: string;
  figure?: {
    className?: string;
  };
  img?: {
    className?: string;
    alt: string;
  };
};

export default function NoData({
  text,
  containerClassName,
  textClassName,
  img,
  figure,
}: NoDataProps) {
  return (
    <div
      className={twMerge("flex items-center justify-center w-full flex-col", containerClassName)}
    >
      <figure className={twMerge("w-[250px] aspect-square", figure?.className)}>
        <img
          src={NoDataImage}
          className={twMerge("w-full h-full object-covers", img?.className)}
          alt={img?.alt}
        />
      </figure>
      <p className={twMerge("text-base font-semibold", textClassName)}>{text}</p>
    </div>
  );
}
