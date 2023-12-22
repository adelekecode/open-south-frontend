import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Pagination } from "@mui/material";
import moment from "moment";
import { stripHtml } from "string-strip-html";
import Seo from "~/components/seo";
import File from "./file";

export default function DatasetDetails() {
  const { slug } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Dataset>([`/public/datasets/${slug}/?key=public`]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!descriptionRef.current) return;
    if (data?.description) {
      descriptionRef.current.innerHTML = data.description;
    } else {
      descriptionRef.current.innerHTML = "";
    }
  }, [data?.description]);

  const stripedDescription =
    data?.description &&
    stripHtml(`${data.description}`, {
      stripTogetherWithTheirContents: ["style", "pre"],
    }).result;

  const arr = data?.temporal_coverage?.split(",");

  const temporalCoverage = {
    from: arr?.[0],
    to: arr?.[1],
  };

  return (
    <>
      <Seo title={data?.title || ""} description={stripedDescription || ""} />
      <main className="max-w-maxAppWidth mx-auto flex flex-col gap-6 p-6 px-10 pt-0 pb-12 tablet:px-6 largeMobile:!px-4">
        <h1 className="text-2xl font-semibold">{data?.title}</h1>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Description</h3>
          <p ref={descriptionRef}></p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">
            <span>50</span> Files
          </h3>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((_, index) => (
              <File key={index + 1} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-4">
            <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Produced By</h3>
          <div className="flex items-center gap-3">
            <figure className="border border-zinc-300 w-[3.5rem] aspect-square bg-white p-1">
              <img
                className="w-full h-full object-contain"
                src={data?.publisher_data?.image_url || ""}
                alt="organization or profile photo"
              />
            </figure>
            <Link
              className="w-fit text-start text-primary-600 capitalize hover:underline relative z-10"
              // to={`/organizations/${data?.publisher_data.slug}`}
              to={""}
              // onClick={(e) => {
              //   e.stopPropagation();
              // }}
            >
              {`${data?.publisher_data?.first_name || "--"} ${
                data?.publisher_data?.last_name || "--"
              }`}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Tags</h3>
          <div className="flex items-center flex-wrap gap-4">
            {[1, 2, 3].map((_, index) => (
              <Link
                className="px-4 py-1 rounded-full bg-primary-100 hover:bg-primary-300 transition-all text-sm text-primary-700 capitalize"
                key={index + 1}
                to={{
                  pathname: "/datasets",
                  search: `?${new URLSearchParams({
                    tags: "map",
                  }).toString()}`,
                }}
              >
                map
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>License</h3>
            <p>{data?.license || "------"}</p>
          </div>
          <div>
            <h3>ID</h3>
            <p>{data?.id || "------"}</p>
          </div>
        </div>
        <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>Creation</h3>
            <p>{data?.created_at ? moment(data.created_at).format("MMMM DD, YYYY") : "------"}</p>
          </div>
          <div>
            <h3>Update Frequency</h3>
            <p>{data?.update_frequency || "------"}</p>
          </div>
          <div>
            <h3>Latest update</h3>
            <p>{data?.updated_at ? moment(data.updated_at).format("MMMM DD, YYYY") : "------"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>Temporal coverage</h3>
            <p className="[&>span]:font-medium [&>span]:capitalize">
              From <span>{temporalCoverage.from || "------"}</span> to{" "}
              <span>{temporalCoverage.to || "------"}</span>
            </p>
          </div>
          <div>
            <h3>Spatial coverage</h3>
            <p className="capitalize">{data?.spatial_coverage || "------"}</p>
          </div>
        </div>
      </main>
    </>
  );
}
