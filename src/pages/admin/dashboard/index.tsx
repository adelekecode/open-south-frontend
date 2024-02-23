import { GoOrganization } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoGridOutline, IoNewspaperOutline } from "react-icons/io5";
import AverageDownloadsPerCategory from "./average-downloads-per-category";
import AverageViewsPerCategory from "./average-views-per-category";
import MostAccessedDatasets from "./most-accessed-datasets";
import MostPublishedOrganizations from "./most-published-organizations";
import { useDashboardCards } from "~/queries/admin-dashboard";

export default function Dashboard() {
  const { data } = useDashboardCards();

  return (
    <>
      <main className="p-6 px-8 pb-12 tablet:px-6 largeMobile:!px-4 gap-4 flex flex-col">
        <header className="flex items-center gap-8 justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>
        <div className="w-full border border-info-100 bg-white p-4 rounded-md">
          <div className="grid grid-cols-4 tabletAndBelow:grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:650px)]:!grid-cols-1 gap-4   [&>div]:w-full [&>div]:rounded-md [&>div]:p-4 [&>div]:flex [&>div]:justify-between [&>div]:min-h-[9rem]   [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:mt-2 [&>div>div]:gap-3   [&>div>div>p]:font-semibold [&>div>div>p]:text-sm [&>div>div>h1]:text-4xl [&>div>div>h1]:font-semibold">
            <div className="bg-amber-50">
              <div>
                <p className="text-info-950">Users</p>
                <h1 className="text-neutral-800">{data?.users ?? "0"}</h1>
              </div>
              <span className="p-2 border border-amber-500 h-fit rounded text-amber-500 text-base">
                <HiOutlineUserGroup />
              </span>
            </div>
            <div className="bg-red-50">
              <div>
                <p className="text-info-950">Datasets</p>
                <h1 className="text-neutral-800">{data?.datasets ?? "0"}</h1>
              </div>
              <span className="p-2 border border-red-500 h-fit rounded text-red-500 text-base">
                <IoGridOutline />
              </span>
            </div>
            <div className="bg-blue-50">
              <div>
                <p className="text-info-950">Organizations</p>
                <h1 className="text-neutral-800">{data?.organisations ?? "0"}</h1>
              </div>
              <span className="p-2 border border-blue-500 h-fit rounded text-blue-500 text-base">
                <GoOrganization />
              </span>
            </div>
            <div className="bg-emerald-50">
              <div>
                <p className="text-info-950">News</p>
                <h1 className="text-neutral-800">{data?.news ?? "0"}</h1>
              </div>
              <span className="p-2 border border-emerald-500 h-fit rounded text-emerald-500 text-base">
                <IoNewspaperOutline />
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 tabletAndBelow:grid-cols-1 gap-4">
          <AverageViewsPerCategory />
          <AverageDownloadsPerCategory />
          <MostAccessedDatasets />
          <MostPublishedOrganizations />
        </div>
      </main>
    </>
  );
}
