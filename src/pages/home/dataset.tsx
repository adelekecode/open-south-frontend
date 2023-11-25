import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import dataset from "~/utils/data/dataset.json";

type FilterState = "data-highlighted" | "reference-data" | "latest-data";

export default function Dataset() {
  const navigate = useNavigate();

  const [filterState, setFilterState] = useState<FilterState>("data-highlighted");

  return (
    <section className="w-full max-w-maxAppWidth mx-auto p-8 py-12 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Datasets</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-full [&>button]:bg-primary-100 [&>button]:text-sm [&>button]:text-primary-700">
            <button
              onClick={() => {
                const state = "data-highlighted";

                if (filterState !== state) {
                  setFilterState(state);
                }
              }}
            >
              Data highlighted
            </button>
            <button
              onClick={() => {
                const state = "latest-data";

                if (filterState !== state) {
                  setFilterState(state);
                }
              }}
            >
              Latest data
            </button>
            {/* <button
              onClick={() => {
                const state = "reference-data";

                if (filterState !== state) {
                  setFilterState(state);
                }
              }}
            >
              Reference data
            </button> */}
          </div>
          <Link
            to={"/datasets"}
            className="flex items-center gap-4 border-b-[1.5px] border-primary-600 hover:border-primary-700"
          >
            <p className="text-primary-600 text-sm">See more datasets</p>
            <FaAngleRight className="text-primary-600 text-xs" />
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-3 gap-4">
        {dataset.slice(0, 9).map((item, index) => {
          const { slug, title, organization, user } = item;

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
              className="flex items-start gap-6 border-[1.5px] border-info-200 p-6 hover:bg-info-50"
            >
              <figure className="border border-zinc-300 w-[9.5rem] aspect-square bg-white">
                <img
                  className="w-full h-full object-contain"
                  src={organization ? organization.image : user ? user.image : ""}
                  alt="organization or profile photo"
                />
              </figure>
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-semibold text-start capitalize">{title}</h1>
                <p className="flex items-center text-sm gap-1">
                  by
                  {organization ? (
                    <Link
                      className="text-primary-600 capitalize hover:underline relative z-10"
                      to={`/organization/${organization.slug}`}
                    >
                      {organization.name}
                    </Link>
                  ) : user ? (
                    <span className="capitalize">{`${user.firstName} ${user.lastName}`}</span>
                  ) : (
                    "-------"
                  )}
                </p>
              </div>
            </button>
          );
        })}
      </main>
    </section>
  );
}
