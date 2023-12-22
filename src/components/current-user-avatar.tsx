import React, { useEffect, useState } from "react";
import { Avatar, AvatarProps } from "@mui/material";
import { IoPerson } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
// import useAppStore from "~/store/app";

type CurrentUserAvatarProps = AvatarProps & {
  iconContainer?: {
    className?: string;
    icon?: {
      className?: string;
    };
  };
};

export default function CurrentUserAvatar({
  className,
  sx,
  iconContainer,
  ...props
}: CurrentUserAvatarProps) {
  const currentUser = {
    image: null,
  };

  const [element, setElement] = useState<null | React.ReactNode>();

  useEffect(() => {
    if (currentUser?.image) {
      return setElement(
        <img src={currentUser.image} alt="profile picture" className="w-full h-full object-cover" />
      );
    } else {
      return setElement(
        <span
          className={twMerge(
            `text-base flex items-center justify-center`,
            iconContainer?.className
          )}
        >
          <IoPerson
            {...iconContainer?.icon}
            className={twMerge(`text-base`, iconContainer?.icon?.className)}
          />
        </span>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.image]);

  return (
    <Avatar
      variant="rounded"
      {...props}
      sx={{
        width: 30,
        height: 30,
        ...sx,
      }}
      className={twMerge("", className)}
    >
      {element}
    </Avatar>
  );
}
