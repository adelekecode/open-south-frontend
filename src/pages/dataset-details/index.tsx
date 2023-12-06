import { Pagination } from "@mui/material";
import Seo from "~/components/seo";
import File from "./file";
import { Link } from "react-router-dom";

export default function DatasetDetails() {
  const data: Dataset = {
    title: "Public Transportation Efficiency in Kenya",
    organization: {
      name: "Kenya Transit Authority",
      slug: "kenya-transit-authority",
      image: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
    },
    user: null,
    description:
      "Dataset focusing on the efficiency of public transportation in Kenya. The data includes information on transit times, ridership patterns, and initiatives to improve public transportation services.",
    slug: "public-transportation-efficiency-kenya",
    updatedAt: "2023-11-22T16:45:00+0100",
  };

  return (
    <>
      <Seo title={data.title || ""} description={data.description || ""} />
      <main className="max-w-maxAppWidth mx-auto flex flex-col gap-6 p-6 px-10 pt-0 pb-12 tablet:px-6 largeMobile:!px-4">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Description</h3>
          <p>{data.description}</p>
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
                src={data.organization ? data.organization.image : data.user ? data.user.image : ""}
                alt="organization or profile photo"
              />
            </figure>
            {data.organization ? (
              <Link
                className="w-fit text-start text-primary-600 capitalize hover:underline relative z-10"
                to={`/organizations/${data.organization.slug}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {data.organization.name}
              </Link>
            ) : data.user ? (
              <span className="capitalize w-fit">{`${data.user.firstName} ${data.user.lastName}`}</span>
            ) : (
              "-------"
            )}
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
            <p>{"Licence Ouverte / Open Licence version 2.0"}</p>
          </div>
          <div>
            <h3>ID</h3>
            <p>{"5b7ffc618b4c4169d30727e0"}</p>
          </div>
        </div>
        <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>Creation</h3>
            <p>{"August 24, 2018"}</p>
          </div>
          <div>
            <h3>Update Frequency</h3>
            <p>{"Monthly"}</p>
          </div>
          <div>
            <h3>Latest update</h3>
            <p>{"December 1, 2023"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
          <div>
            <h3>Temporal coverage</h3>
            <p className="[&>span]:font-medium [&>span]:capitalize">
              From <span>{"August 24, 2018"}</span> to <span>{"June 10, 2021"}</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
