import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
// import category from "~/utils/data/category.json";
import Environment from "~/assets/illustrations/categories/environment.png";

type FilterState = "category-highlighted" | "latest-category";

export default function Category() {
  const navigate = useNavigate();

  const [filterState, setFilterState] = useState<FilterState>("category-highlighted");

  return (
    <section className="w-full max-w-maxAppWidth mx-auto p-8 py-12 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-full [&>button]:bg-primary-100 [&>button]:text-sm [&>button]:text-primary-700">
            <button
              onClick={() => {
                const state = "category-highlighted";

                if (filterState !== state) {
                  setFilterState(state);
                }
              }}
            >
              Data highlighted
            </button>
            <button
              onClick={() => {
                const state = "latest-category";

                if (filterState !== state) {
                  setFilterState(state);
                }
              }}
            >
              Latest data
            </button>
          </div>
          <Link
            to={"/categories"}
            className="flex items-center gap-4 border-b-[1.5px] border-primary-600 hover:border-primary-700"
          >
            <p className="text-primary-600 text-sm">See more categories</p>
            <FaAngleRight className="text-primary-600 text-xs" />
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-4 gap-4">
        <button
          onClick={() => {
            navigate(`./categories/environment`);
          }}
          className="flex flex-col border-[1.5px] border-info-200 hover:bg-info-50"
        >
          <figure className="bg-primary-50 flex items-center justify-center p-4 w-full max-h-[200px] aspect-[1/0.1]">
            <img
              src={Environment}
              alt="environment category"
              className="object-contain w-full h-full"
            />
          </figure>
          <div className="flex flex-col items-start gap-4 p-4">
            <h2 className="text-base font-semibold">Environment</h2>
            <p className="text-start text-sm">
              A category that encompasses datasets related to the environment, including air
              quality, water scarcity, wildlife conservation, and renewable energy.
            </p>
          </div>
        </button>
      </main>
    </section>
  );
}
