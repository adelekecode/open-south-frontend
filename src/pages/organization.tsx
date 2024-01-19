import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { stripHtml } from "string-strip-html";
import { FiSearch } from "react-icons/fi";
import SearchInput from "~/components/inputs/search-input";
import SelectInput from "~/components/inputs/select-input";
import Seo from "~/components/seo";
import { usePublicOrganizations } from "~/queries/organizations";
import NoData from "~/assets/illustrations/no-data.png";

type SortByValue = "relevance" | "most-datasets" | "most-recent";

export default function Organization() {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<SortByValue>("relevance");

  const { isLoading, data } = usePublicOrganizations();

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
        <p className="tablet:text-sm">Search among organizations on Open South.</p>
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
            <span>{data?.count || 0}</span> results
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
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4 tablet:grid-cols-2 [@media(max-width:560px)]:grid-cols-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index + 1} className="border rounded-md flex flex-col p-4 gap-7">
                <div className="flex items-center gap-5">
                  <div className="w-20 rounded aspect-square animate-pulse bg-gray-200"></div>
                  <div className="w-28 rounded-sm h-6 animate-pulse bg-gray-200"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full rounded-sm h-4 animate-pulse bg-gray-200"></div>
                  <div className="w-full rounded-sm h-4 animate-pulse bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : data && data.results.length > 0 ? (
          <main className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
            {data.results.map((item, index) => {
              const { name, slug, logo, description } = item;

              const stripedDescription = stripHtml(`${description}`, {
                stripTogetherWithTheirContents: ["style", "pre"],
              }).result;

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
                  <div className="w-full grid grid-cols-[70px,1fr] gap-4 items-center">
                    <figure className="border w-full aspect-square border-zinc-300 bg-white">
                      <img
                        className="w-full h-full object-contain"
                        src={logo || ""}
                        alt="organization photo"
                      />
                    </figure>
                    <h3 className="text-sm text-start font-semibold">{name}</h3>
                  </div>
                  <p className="text-start text-sm">
                    {stripedDescription.length > 300
                      ? stripedDescription.substring(0, 300).split(" ").slice(0, -1).join(" ") +
                        "..."
                      : stripedDescription}
                  </p>
                </button>
              );
            })}
          </main>
        ) : (
          <div className="flex items-center justify-center w-full flex-col">
            <figure className="w-[250px] aspect-square">
              <img
                src={NoData}
                className="w-full h-full object-covers"
                alt="No category data illustration"
              />
            </figure>
            <p className="text-base font-semibold">No organization found</p>
          </div>
        )}
      </main>
    </>
  );
}
