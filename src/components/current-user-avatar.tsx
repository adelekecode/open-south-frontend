import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  const [element, setElement] = useState<null | React.ReactNode>();

  useEffect(() => {
    if (currentUser?.image_url) {
      return setElement(
        <img
          src={currentUser.image_url}
          alt="profile picture"
          className="w-full h-full object-contain"
        />
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
  }, [currentUser?.image_url]);

  return (
    <Avatar
      variant="rounded"
      {...props}
      sx={{
        width: 30,
        height: 30,
        backgroundColor: currentUser?.image_url ? "white" : undefined,
        ...sx,
      }}
      className={twMerge("", className)}
    >
      {element}
    </Avatar>
  );
}
