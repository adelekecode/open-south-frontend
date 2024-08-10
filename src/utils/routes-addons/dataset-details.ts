import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { queryClient } from "../react-query";

export async function datasetDetailsLoader({ params }: LoaderFunctionArgs) {
  try {
    const { data: response } = await axios.get(`/public/datasets/${params.slug}/?key=public`);

    queryClient.setQueryData([`/public/datasets/${params.slug}/?key=public`], response);

    return null;
  } catch (error) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/404",
      },
    });
  }
}
