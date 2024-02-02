import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "~/utils/api";
import { notifySuccess } from "~/utils/toast";

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: Record<"first_name" | "last_name" | "email", string>) => {
      const { data: response } = await axiosPrivate.patch("/auth/users/me/", data);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["/auth/users/me/"]);
        notifySuccess("Profile updated successfully");
      },
    }
  );
}

export function useImageUpload() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { image: File }) => {
      const { data: response } = await axiosPrivate.postForm("/auth/profile-image-upload/", data);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["/auth/users/me/"]);
      },
    }
  );
}

// function fileToBase64(file: File) {
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();

//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       resolve(reader.result as string);
//     };

//     reader.onerror = function (error) {
//       reject(error);
//     };
//   });
// }
