import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import SearchInput from "~/components/search-input";
import SelectInput from "~/components/select-input";
import Seo from "~/components/seo";
import Data from "~/utils/data/organization.json";

type SortByValue = "relevance" | "most-datasets" | "most-recent";

export default function Organization() {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<SortByValue>("relevance");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Seo title="Organization" description="" />
      <main className="w-full max-w-maxAppWidth p-6 px-10 tablet:px-6 pt-0 mx-auto largeMobile:!px-4 pb-16">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold mb-2">
          Organization
        </h1>
        <p className="tablet:text-sm">
          Search among the <span>5,000</span> organizations on Open South
        </p>
        <div className="flex flex-col gap-2 pt-4">
          <SearchInput
            placeholder="Search..."
            className="w-full h-[inherit]"
            searchIcon={
              <div className="flex items-center gap-2 p-2">
                <FiSearch className="w-5 h-5 text-white" />
                <p className="text-white tablet:hidden text-base">Search</p>
              </div>
            }
          />
        </div>
        <header className="flex items-center flex-wrap largeMobile:flex-col gap-6 justify-between py-6">
          <p className="self-start">
            <span>5,000</span> results
          </p>
          <div className="flex items-center gap-2 largeMobile:w-full largeMobile:flex-col largeMobile:items-start">
            <p className="whitespace-nowrap text-sm">Sort by:</p>
            <SelectInput
              className="min-w-[210px]"
              value={sortBy}
              onChange={(e) => {
                if (e.target.value) {
                  setSortBy(e.target.value as SortByValue);
                }
              }}
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="most-datasets">The Most Datasets</MenuItem>
              <MenuItem value="most-recent">The Most Recent</MenuItem>
            </SelectInput>
          </div>
        </header>
        <main className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
          {Data.map((item, index) => {
            const { name, slug, image, description } = item;

            return (
              <button
                key={index + 1}
                onClick={() => {
                  navigate(`./${slug}`, {
                    state: {
                      name,
                    },
                  });
                }}
                className="flex flex-col gap-6 border-[1.5px] border-info-200 border-b-2 border-b-primary-700 p-4 hover:bg-info-50"
              >
                <div className="w-full grid grid-cols-[70px,1fr] gap-4">
                  <figure className="border border-zinc-300 aspect-square bg-white">
                    <img
                      className="w-full h-full object-contain"
                      src={image || ""}
                      alt="organization photo"
                    />
                  </figure>
                  <h3 className="text-sm text-start font-semibold">{name}</h3>
                </div>
                <p className="text-start text-sm">
                  {description.length > 300
                    ? description.substring(0, 300).split(" ").slice(0, -1).join(" ") + "..."
                    : description}
                </p>
              </button>
            );
          })}
        </main>
      </main>
    </>
  );
}
