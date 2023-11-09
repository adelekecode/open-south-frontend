import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "~/utils/api";

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: Record<string, any>) => {
      const { data: response } = await axiosPrivate.patch("/auth/users/me/", data);

      return response.data;
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
    async (data: Record<string, any>) => {
      if (data.image_file) {
        data.image = await fileToBase64(data.image_file);
      }

      const { data: response } = await axiosPrivate.post("/auth/image-upload", data);

      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["/auth/users/me/"]);
      },
    }
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as string);
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
}
