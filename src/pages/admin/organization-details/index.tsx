import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import UserTable from "./user-table";
import Button from "~/components/button";
import RequestModal from "./request-modal";
import { useAdminOrganizationDetails } from "~/queries/organizations";
import DashboardLoader from "~/components/loader/dashboard-loader";
import NotFound from "~/pages/404";

export default function OrganizationDetails() {
  const { id } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  const [displayRequestModal, setDisplayRequestModal] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0,
  });

  const { data, isLoading } = useAdminOrganizationDetails(id || "");

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

  if (!isLoading && !data) {
    return <NotFound />;
  }

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-medium flex items-center gap-2 text-base">
            <button
              onClick={() => navigate("/admin/organizations")}
              className="text-2xl font-semibold largeMobile:text-xl"
            >
              Organization
            </button>{" "}
            <span className="text-sm">{">"}</span>{" "}
            <span className="text-info-800">{data?.name || "-----"}</span>
          </h1>
          <Button
            className="!py-2 !px-3 !text-xs"
            variant="outlined"
            onClick={() => {
              setDisplayRequestModal(true);
            }}
          >
            View Requests
          </Button>
        </div>
        <div className="bg-white w-full border border-info-100 rounded-md flex flex-col gap-6 p-6">
          <header className="flex flex-col gap-4">
            <figure className="w-[7rem] h-[7rem] border p-2 bg-white">
              <img
                src={data.logo || ""}
                alt="organization logo"
                className="w-full h-full object-contain"
              />
            </figure>
            <h1 className="text-xl font-semibold">{data.name || "----------"}</h1>
          </header>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xs text-info-950">Description</h2>
              <p ref={descriptionRef}></p>
            </div>
            <UserTable
              pagination={pagination}
              setPagination={(obj: typeof pagination) => setPagination(obj)}
            />
            <div className="flex flex-col gap-3"></div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xs text-info-950">General Statistics</h2>
              <div className="flex items-start gap-16 [&>div]:flex [&>div]:flex-col [&>div>p]:text-sm [&>div>p]:font-medium [&>div>h3]:text-xl [&>div>h3]:font-bold">
                <div>
                  <p>Datasets</p>
                  <h3>{data.data_count ?? "------"}</h3>
                </div>
                <div>
                  <p>Views</p>
                  <h3>{data.views_count ?? "------"}</h3>
                </div>
                <div>
                  <p>Downloads</p>
                  <h3>{data.downloads_count ?? "------"}</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xs text-info-950">Technical Details</h2>
              <div className="grid gap-8 grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 [&>div]:flex [&>div]:flex-col [&>div>h3]:font-semibold [&>div>h3]:text-sm">
                <div>
                  <h3>Latest dataset update</h3>
                  <p>
                    {data.updated_at ? moment(data.updated_at).format("Do MMM, YYYY") : "---------"}
                  </p>
                </div>
                <div>
                  <h3>Organization creation date</h3>
                  <p>
                    {data.created_at ? moment(data.created_at).format("Do MMM, YYYY") : "---------"}
                  </p>
                </div>
                <div>
                  <h3>ID</h3>
                  <p>{data.id || "---------"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {displayRequestModal && (
        <RequestModal
          setOpen={(bool: boolean) => setDisplayRequestModal(bool)}
          open={displayRequestModal}
          pagination={pagination}
        />
      )}
    </>
  );
}
