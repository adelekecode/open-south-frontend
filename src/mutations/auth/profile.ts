import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "~/utils/api";

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: {
      first_name?: string;
      last_name?: string;
      email?: string;
      meta?: {
        developer_enabled?: boolean;
      };
    }) => {
      const { data: response } = await axiosPrivate.patch("/auth/users/me/", data);

      return response;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["/auth/users/me/"]);
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
