import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Seo from "~/components/seo";
import { usePublicProfile } from "~/queries/user";
import NotFound from "./404";
import { usePublicDatasets } from "~/queries/dataset";
import NoData from "~/components/no-data";
import { Pagination } from "@mui/material";

export default function PublicProfile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = usePublicProfile(id || "", {
    enabled: !!id,
  });
  const { data: dataset, isLoading: isLoadingDataset } = usePublicDatasets(); //? change this to user dataset

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

  //? About not set
  return (
    <>
      <Seo
        title={data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : ""}
        description={data.bio || ""}
      />
      <main className="w-full pb-16 flex flex-col gap-4">
        <div className="bg-primary-50 pt-16 pb-8">
          <header className="flex flex-col gap-6 max-w-maxAppWidth mx-auto px-10 tablet:px-6 largeMobile:!px-4">
            <figure className="w-[7rem] h-[7rem] border p-2 bg-white">
              <img
                src={data.image_url || ""}
                alt="organization logo"
                className="w-full h-full object-contain"
              />
            </figure>
            <h1 className="text-2xl font-semibold">
              {data.first_name && data.last_name
                ? `${data.first_name} ${data.last_name}`
                : "----------"}
            </h1>
          </header>
        </div>
        <main className="w-full max-w-maxAppWidth mx-auto flex flex-col gap-12 p-6 px-10 tablet:px-6 largeMobile:!px-4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-base">Bio</h2>
            <p className="text-sm">{data.bio || "-------"}</p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-semibold text-base">Datasets</h2>
            </div>
            {isLoadingDataset ? (
              <div></div>
            ) : dataset && dataset.length > 0 ? (
              <>
                <div className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
                  {dataset.slice(0, 9).map((item, index) => {
                    const { slug, title, publisher_data } = item;
                    const { image_url } = publisher_data;

                    return (
                      <button
                        key={index + 1}
                        onClick={() => {
                          navigate(`/datasets/${slug}`, {
                            state: {
                              name: item.title,
                            },
                          });
                        }}
                        className="grid grid-cols-[80px,1fr] tabletAndBelow:grid-cols-[70px,1fr] gap-4 border-[1.5px] border-info-100 p-4 hover:bg-info-50"
                      >
                        <figure className="w-full border border-zinc-300 bg-white aspect-square">
                          <img
                            className="w-full h-full object-contain"
                            src={image_url || ""}
                            alt="creator profile image"
                            // loading="lazy"
                          />
                        </figure>
                        <div className="flex flex-col gap-2">
                          <h1 className="text-sm font-semibold text-start capitalize">{title}</h1>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center mt-4">
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </div>
              </>
            ) : (
              <NoData
                text="No dataset found"
                img={{
                  alt: "No dataset illustration",
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-base">General Statistics</h2>
            <div className="flex items-start gap-16 [&>div]:flex [&>div]:flex-col [&>div>p]:text-sm [&>div>p]:font-medium [&>div>h3]:text-4xl [&>div>h3]:font-bold">
              <div>
                <p>Datasets</p>
                <h3>317</h3>
              </div>
              <div>
                <p>Views</p>
                <h3>4.3M</h3>
              </div>
              <div>
                <p>Downloads</p>
                <h3>1.2M</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-base">Technical Details</h2>
            <div className="grid gap-8 grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 [&>div]:flex [&>div]:flex-col [&>div>h3]:font-semibold [&>div>h3]:text-sm">
              <div>
                <h3>User joined date</h3>
                <p>
                  {data.date_joined ? moment(data.date_joined).format("MMMM DD, YYYY") : "-------"}
                </p>
              </div>
              <div>
                <h3>ID</h3>
                <p>{data.id || "-------"}</p>
              </div>
            </div>
          </div>
        </main>
      </main>
    </>
  );
}
