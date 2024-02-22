import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { usePopularDatasets } from "~/queries/dataset";
import NoData from "~/components/no-data";
import { Avatar } from "@mui/material";
import { IoPerson } from "react-icons/io5";

export default function Dataset() {
  const navigate = useNavigate();

  const { data, isLoading } = usePopularDatasets();

  return (
    <section className="w-full max-w-maxAppWidth mx-auto p-8 tablet:px-5 largeMobile:!px-4 py-12 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Datasets</h2>
        <div className="flex items-center gap-6">
          {data && data.length > 0 && (
            <Link
              to={"/datasets"}
              className="flex items-center gap-4 border-b-[1.5px] border-primary-600 hover:border-primary-700"
            >
              <p className="text-primary-600 text-sm">See more datasets</p>
              <FaAngleRight className="text-primary-600 text-xs" />
            </Link>
          )}
        </div>
      </header>
      {isLoading ? (
        <div className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              className="grid grid-cols-[5rem,1fr] gap-6 border-[1.5px] border-info-200 p-6"
              key={index + 1}
            >
              <div className="w-full aspect-square animate-pulse bg-info-200"></div>
              <div className="grid grid-rows-[1rem,0.5rem,1fr,0.5rem] gap-2">
                <span className="w-full h-full animate-pulse bg-info-200"></span>
                <span className="w-full h-full animate-pulse bg-info-200"></span>
                <span className="w-full h-full animate-pulse bg-info-200"></span>
                <span className="w-32 mt-2 h-full animate-pulse bg-info-200 ml-auto"></span>
              </div>
            </div>
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <main className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
          {data.slice(0, 9).map((item, index) => {
            const { slug, title, publisher_data } = item;

            return (
              <button
                key={index + 1}
                onClick={() => {
                  navigate(`/datasets/${slug}`, {
                    state: {
                      name: title,
                    },
                  });
                }}
                className="grid grid-cols-[80px,1fr] tabletAndBelow:grid-cols-[70px,1fr] gap-4 border-[1.5px] border-info-100 p-4 hover:bg-info-50"
              >
                {publisher_data?.image_url || publisher_data?.logo_url ? (
                  <figure className="border border-zinc-300 aspect-square w-20 tabletAndBelow:w-[70px] bg-white">
                    <img
                      className="w-full h-full object-contain"
                      src={publisher_data.image_url || publisher_data.logo_url || ""}
                      alt="organization or profile photo"
                    />
                  </figure>
                ) : (
                  <Avatar variant="square" className="!size-20">
                    <IoPerson className={`text-3xl`} />
                  </Avatar>
                )}
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm font-semibold text-start">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </h1>
                  <p className="text-start text-xs">
                    <span className="pr-1">by</span>
                    <Link
                      className="text-primary-600 capitalize hover:underline relative z-10"
                      to={
                        publisher_data?.type === "organisation"
                          ? `/organizations/${publisher_data.slug}`
                          : publisher_data?.type === "individual"
                            ? `/users/${publisher_data.id}`
                            : ""
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {publisher_data?.type === "organisation" ? (
                        <span>{publisher_data.name}</span>
                      ) : publisher_data?.type === "individual" ? (
                        <span>
                          {`${publisher_data?.first_name || "---"} ${publisher_data?.last_name || "---"}`}
                        </span>
                      ) : (
                        "-------"
                      )}
                    </Link>
                  </p>
                </div>
              </button>
            );
          })}
        </main>
      ) : (
        <NoData text="No dataset data" />
      )}
    </section>
  );
}
