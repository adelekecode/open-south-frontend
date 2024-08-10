import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoPerson } from "react-icons/io5";
import moment from "moment";
import { stripHtml } from "string-strip-html";
import slugify from "slugify";
import Seo from "~/components/seo";
import { useDatasetView } from "~/mutations/dataset";
import File from "./file";
import { usePublicDatasetDetails } from "~/queries/dataset";
import NotFound from "../404";
import FilePreview from "~/components/file/preview";
import { useDatasetFileDownload } from "~/mutations/dataset";
import useAppStore from "~/store/app";
import DatasetAgreement from "./dataset-agreement";

const filesPerPage = 3;

export default function DatasetDetails() {
  const { t } = useTranslation("layout/dataset/slug");

  const { slug } = useParams();

  const descriptionRef = useRef<HTMLDivElement>(null);
  const effectHasRun = useRef(false);

  const { userLocation, agreeTerms } = useAppStore();

  const [previewFile, setPreviewFile] = useState<{
    open: boolean;
    data: Dataset["files"][0] | null;
  }>({
    open: false,
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = usePublicDatasetDetails(slug || "", {
    enabled: !!slug,
  });
  const datasetView = useDatasetView();
  const fileDownload = useDatasetFileDownload();

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
    if (data?.id) {
      if (!effectHasRun.current) {
        (async () => {
          await datasetView.mutateAsync({
            id: data.id,
            country: userLocation?.country,
          });
          effectHasRun.current = true;
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id]);

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

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = data.files.slice(indexOfFirstFile, indexOfLastFile);

  return (
    <>
      <Seo title={data?.title || ""} description={stripedDescription || ""} />
      <main className="max-w-maxAppWidth mx-auto flex flex-col gap-6 p-6 px-10 pt-0 pb-12 tablet:px-6 largeMobile:!px-4">
        <h1 className="text-2xl font-semibold largeMobile:text-xl">
          {data?.title ? data.title.charAt(0).toUpperCase() + data.title.slice(1) : "------"}
        </h1>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">{t("description")}</h3>
          <div className="[&_a]:text-blue-600 [&_a]:underline text-base" ref={descriptionRef}></div>
        </div>
        {data.files && data.files.length > 0 && (
          <div className="flex flex-col gap-3 pb-4">
            <h3 className="text-sm font-medium">
              <span>{data.files.length || "--"}</span>{" "}
              {data.files.length === 1 ? t("file.text.singular") : t("file.text.plural")}
            </h3>
            <div className="flex flex-col gap-4">
              {currentFiles.map((item, index) => (
                <File
                  key={index + 1}
                  {...item}
                  setPreviewFile={(obj: { open: boolean; data: Dataset["files"][0] | null }) =>
                    setPreviewFile(obj)
                  }
                />
              ))}
            </div>
            {data.files.length > filesPerPage && (
              <div className="flex items-center justify-center mt-4">
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  count={Math.ceil(data.files.length / filesPerPage)}
                  page={currentPage}
                  onChange={(_, page) => {
                    setCurrentPage(page);
                  }}
                />
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">{t("author.text")}</h3>
          <div className="flex items-center gap-3 flex-wrap">
            {data.publisher_data?.image_url || data.publisher_data?.logo_url ? (
              <figure className="border border-zinc-300 w-[3.5rem] aspect-square bg-white p-1">
                <img
                  className="w-full h-full object-contain"
                  src={data.publisher_data.image_url || data.publisher_data.logo_url || ""}
                  alt="organization or profile photo"
                />
              </figure>
            ) : (
              <Avatar variant="square" className="!w-[3.5rem] !h-[3.5rem]">
                <IoPerson className={`text-3xl`} />
              </Avatar>
            )}
            <Link
              className="text-primary-600 capitalize hover:underline relative z-10 largeMobile:text-sm"
              to={
                data.publisher_data.type === "organisation"
                  ? `/organizations/${data.publisher_data.slug}`
                  : data.publisher_data.type === "individual"
                    ? `/users/${data.publisher_data.id}`
                    : ""
              }
            >
              {data.publisher_data.type === "organisation" ? (
                <span>{data.publisher_data.name}</span>
              ) : data.publisher_data.type === "individual" ? (
                <span>
                  {`${data.publisher_data?.first_name || "--"} ${data.publisher_data?.last_name || "--"}`}
                </span>
              ) : (
                "-------"
              )}
            </Link>
          </div>
        </div>
        {data.tags_data && data.tags_data.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="flex items-center flex-wrap gap-4">
              {data.tags_data.map((item, index) => (
                <Link
                  className="px-4 py-1 rounded-full bg-primary-100 hover:bg-primary-300 transition-all text-sm text-primary-700 largeMobile:text-xs largeMobile:px-2"
                  key={index + 1}
                  to={{
                    pathname: "/datasets",
                    search: `?${new URLSearchParams({
                      tags: `${slugify(item.name, {
                        lower: true,
                        strict: true,
                        trim: true,
                      })}`,
                    }).toString()}`,
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-6 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:largeMobile:text-xs [&>div>p]:largeMobile:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>{t("license")}</h3>
            <p>{data.license || "------"}</p>
          </div>
          {/* <div>
            <h3>ID</h3>
            <p>{data.id || "------"}</p>
          </div> */}
        </div>
        <div className="flex gap-6 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:largeMobile:text-xs [&>div>p]:largeMobile:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>{t("created-on")}</h3>
            <p>{data?.created_at ? moment(data.created_at).format("MMMM DD, YYYY") : "------"}</p>
          </div>
          <div>
            <h3>{t("update-frequency")}</h3>
            <p>{data?.update_frequency || "------"}</p>
          </div>
          <div>
            <h3>{t("latest-update")}</h3>
            <p>{data?.updated_at ? moment(data.updated_at).format("MMMM DD, YYYY") : "------"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:largeMobile:text-xs [&>div>p]:largeMobile:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>{t("temporal-coverage")}</h3>
            <p className="[&>span]:font-medium [&>span]:capitalize">
              From <span>{temporalCoverage.from || "------"}</span> to{" "}
              <span>{temporalCoverage.to || "------"}</span>
            </p>
          </div>
          <div>
            <h3>{t("spatial-coverage")}</h3>
            <p className="capitalize">{data?.spatial_coverage || "------"}</p>
          </div>
        </div>
      </main>
      {previewFile.open && previewFile.data && (
        <FilePreview
          open={true}
          setOpen={(obj: { open: boolean; data: Dataset["files"][0] | null }) =>
            setPreviewFile(obj)
          }
          file={previewFile.data}
          onDownload={(id: string) => fileDownload.mutateAsync(id)}
        />
      )}
      {!agreeTerms && <DatasetAgreement />}
    </>
  );
}
