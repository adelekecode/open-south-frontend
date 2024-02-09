import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { stripHtml } from "string-strip-html";
import Seo from "~/components/seo";
import NotFound from "./404";
import { useNewsView } from "~/mutations/news";
import { usePublicNewsDetails } from "~/queries/news";

export default function NewsDetails() {
  const { slug } = useParams();

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const effectHasRun = useRef(false);

  const { data, isLoading } = usePublicNewsDetails(slug || "");
  const newsView = useNewsView();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!descriptionRef.current) return;
    if (data?.body) {
      descriptionRef.current.innerHTML = data.body;
    } else {
      descriptionRef.current.innerHTML = "";
    }
  }, [data?.body]);

  useEffect(() => {
    if (!effectHasRun.current) {
      (async () => {
        effectHasRun.current = true;
        if (data?.id) {
          await newsView.mutateAsync(data.id);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <main className="max-w-maxAppWidth mx-auto flex flex-col gap-6 p-6 px-10 pt-0 pb-16 tablet:px-6 largeMobile:!px-4">
        <div className="flex flex-col gap-2">
          <div className="w-[100px] h-8 animate-pulse rounded-sm bg-gray-200" />
          <div className="w-[50px] h-4 animate-pulse rounded-sm bg-gray-200" />
        </div>
        <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-md" />
        <div className="w-full grid grid-rows-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index + 1} className="animate-pulse rounded-sm bg-gray-200 h-full" />
          ))}
        </div>
      </main>
    );
  }

  if (!isLoading && !data) {
    return <NotFound />;
  }

  const stripedDescription =
    data?.body &&
    stripHtml(`${data.body}`, {
      stripTogetherWithTheirContents: ["style", "pre"],
    }).result;

  return (
    <>
      <Seo title={data.title || ""} description={stripedDescription || ""} />
      <main className="max-w-maxAppWidth mx-auto flex flex-col gap-6 p-6 px-10 pt-0 pb-16 tablet:px-6 largeMobile:!px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-sm font-medium">
            Published on{" "}
            {data.published_at ? moment(data.published_at).format("MMMM D, YYYY") : "------"}
          </p>
        </div>
        <figure className="w-full aspect-video">
          <img src={data.image_url || ""} className="object-cover w-full h-full" alt="banner" />
        </figure>
        <p className="[&_a]:text-blue-600 [&_a]:underline" ref={descriptionRef} />
      </main>
    </>
  );
}
