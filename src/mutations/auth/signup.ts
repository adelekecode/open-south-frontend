import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function useSignUp() {
  return useMutation(async (data: Record<string, any>) => {
    const { data: response } = await axios.post("/auth/users/", data);

    return response.data;
  });
}

export default useSignUp;
