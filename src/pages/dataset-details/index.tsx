import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import moment from "moment";
import { stripHtml } from "string-strip-html";
import Seo from "~/components/seo";
import { useDatasetView } from "~/mutations/dataset";
import File from "./file";
import FilePreview from "./file-preview";
import { usePublicDatasetDetails } from "~/queries/dataset";
import NotFound from "../404";

export default function DatasetDetails() {
  const { slug } = useParams();

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const effectHasRun = useRef(false);

  const [previewFile, setPreviewFile] = useState<{
    open: boolean;
    data: Dataset["files"][0] | null;
  }>({
    open: false,
    data: null,
  });

  const { data, isLoading } = usePublicDatasetDetails(slug || "", {
    enabled: !!slug,
  });
  const datasetView = useDatasetView();

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

  useEffect(() => {
    if (!effectHasRun.current) {
      (async () => {
        effectHasRun.current = true;
        if (data?.id) {
          await datasetView.mutateAsync(data.id);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <main className="max-w-maxAppWidth mx-auto flex flex-col gap-6 p-6 px-10 pt-0 pb-12 tablet:px-6 largeMobile:!px-4">
        <div className="animate-pulse bg-gray-200 h-6 w-[30%] rounded-sm" />
        <div className="flex flex-col gap-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index + 1} className="animate-pulse bg-gray-200 h-4 rounded-sm" />
          ))}
          <div className="animate-pulse bg-gray-200 h-4 rounded-sm w-[45%]" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index + 1}
              className={`rounded-sm flex gap-4 items-center ${index < 2 && "border-b"} pb-4`}
            >
              <div className="animate-pulse bg-gray-200 rounded-sm w-[35px] aspect-square" />
              <div className="flex flex-col gap-2 w-full">
                <div className="animate-pulse bg-gray-200 rounded-sm h-8 w-[55%]" />
                <div className="animate-pulse bg-gray-200 rounded-sm h-4 w-[20%]" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (!isLoading && !data) {
    return <NotFound />;
  }

  const stripedDescription =
    data.description &&
    stripHtml(`${data.description}`, {
      stripTogetherWithTheirContents: ["style", "pre"],
    }).result;

  const arr = data.temporal_coverage?.split(",");

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
        {data.files && data.files.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">
              <span>{data.files.length || "--"}</span> {data.files.length === 1 ? "File" : "Files"}
            </h3>
            <div className="flex flex-col gap-4">
              {data.files.map((item, index) => (
                <File
                  key={index + 1}
                  {...item}
                  setPreviewFile={(obj: { open: boolean; data: Dataset["files"][0] | null }) =>
                    setPreviewFile(obj)
                  }
                />
              ))}
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination count={10} variant="outlined" shape="rounded" />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Produced By</h3>
          <div className="flex items-center gap-3">
            <figure className="border border-zinc-300 w-[3.5rem] aspect-square bg-white p-1">
              <img
                className="w-full h-full object-contain"
                src={data.publisher_data?.image_url || ""}
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
              {`${data.publisher_data?.first_name || "--"} ${
                data.publisher_data?.last_name || "--"
              }`}
            </Link>
          </div>
        </div>
        {data.tags_data && data.tags_data.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="flex items-center flex-wrap gap-4">
              {data.tags_data.map((item, index) => (
                <Link
                  className="px-4 py-1 rounded-full bg-primary-100 hover:bg-primary-300 transition-all text-sm text-primary-700"
                  key={index + 1}
                  to={{
                    pathname: "/datasets",
                    search: `?${new URLSearchParams({
                      tags: `${item.name}`,
                    }).toString()}`,
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>License</h3>
            <p>{data.license || "------"}</p>
          </div>
          <div>
            <h3>ID</h3>
            <p>{data.id || "------"}</p>
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
        <div className="flex flex-col gap-6 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
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
      <FilePreview
        open={previewFile.open}
        setOpen={(obj: { open: boolean; data: Dataset["files"][0] | null }) => setPreviewFile(obj)}
        file={previewFile.data}
      />
    </>
  );
}
