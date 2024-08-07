import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import moment from "moment";
import DashboardLoader from "~/components/loader/dashboard-loader";
import NotFound from "~/pages/404";
import { useAdminDatasetDetails } from "~/queries/dataset";
import Resources from "./resources";

export default function DatasetDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const { data, isLoading } = useAdminDatasetDetails(id || "");

  useEffect(() => {
    if (!descriptionRef.current) return;
    if (data?.description) {
      descriptionRef.current.innerHTML = data.description;
    } else {
      descriptionRef.current.innerHTML = "";
    }
  }, [data?.description]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!data) {
    return <NotFound />;
  }

  const arr = data.temporal_coverage?.split(",");
  const temporalCoverage = {
    from: arr?.[0],
    to: arr?.[1],
  };

  return (
    <>
      <main className="p-6 px-8 tablet:px-5 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <header className="flex justify-between items-center">
          <button className="flex items-center gap-1 text-zinc-600" onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack className="text-2xl" />
            <small className="font-medium">{"Back to datasets"}</small>
          </button>
        </header>
        <div className="border border-info-100 rounded-md overflow-hidden">
          <div
            className={`bg-white w-full flex flex-col gap-6 p-6 ${data.status === "pending" && "pt-4"} tablet:px-4`}
          >
            <h1 className="text-xl font-semibold">
              {data.title ? data.title.charAt(0).toUpperCase() + data.title.slice(1) : "-------"}
            </h1>
            <p ref={descriptionRef}></p>
            {data.tags_data && data.tags_data.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium">Tags</h3>
                <div className="flex items-center flex-wrap gap-4">
                  {data.tags_data.map((item, index) => (
                    <p
                      className="px-4 py-1 rounded-full bg-primary-100 text-sm text-primary-700"
                      key={index + 1}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-xs [&>div>p]:text-sm [&>div>h3]:font-medium">
              <div>
                <h3>License</h3>
                <p>{data.license || "-------"}</p>
              </div>
            </div>
            <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-xs [&>div>p]:text-sm [&>div>h3]:font-medium">
              <div>
                <h3>Creation</h3>
                <p>
                  {data.created_at ? moment(data.created_at).format("MMMM DD, YYYY") : "-------"}
                </p>
              </div>
              <div>
                <h3>Update Frequency</h3>
                <p>{data.update_frequency || "-------"}</p>
              </div>
              <div>
                <h3>Latest update</h3>
                <p>
                  {data.updated_at ? moment(data.updated_at).format("MMMM DD, YYYY") : "-------"}
                </p>
              </div>
            </div>
            <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-xs [&>div>p]:text-sm [&>div>h3]:font-medium">
              <div>
                <h3>Temporal coverage</h3>
                <p className="[&>span]:font-medium [&>span]:capitalize">
                  From <span>{temporalCoverage.from || "------"}</span> to{" "}
                  <span>{temporalCoverage.to || "------"}</span>
                </p>
              </div>
              <div>
                <h3>Spatial coverage</h3>
                <p className="capitalize">{data.spatial_coverage || "------"}</p>
              </div>
            </div>
            <Resources />
          </div>
        </div>
      </main>
    </>
  );
}
