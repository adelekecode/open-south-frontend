import { useState } from "react";
import { MenuItem, Pagination } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import SearchInput from "~/components/search-input";
import Seo from "~/components/seo";
import SelectInput from "~/components/select-input";
import Card from "./card";
import data from "~/utils/data/dataset.json";
// import AutocompleteInput from "~/components/auto-complete-input";

type SortByValue = "relevance" | "creation-date" | "last-update";

export default function Dataset() {
  const [sortBy, setSortBy] = useState<SortByValue>("relevance");

  return (
    <>
      <Seo title="Dataset" description="Checkout the dataset that have been created" />
      <main className="w-full max-w-maxAppWidth p-6 px-10 tablet:px-6 pt-0 mx-auto largeMobile:!px-4">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold mb-2">
          Datasets
        </h1>
        <p className="largeMobile:text-sm">
          Search among the <span>40,042</span> datasets on Open South
        </p>
        <div className="flex flex-col gap-2 pt-4">
          <SearchInput
            placeholder="Search"
            className="w-full h-[inherit]"
            searchIcon={
              <div className="flex items-center gap-2 p-2">
                <FiSearch className="w-5 h-5 text-white" />
                <p className="text-white tablet:hidden text-base">Search</p>
              </div>
            }
          />
        </div>
        <div className="w-full grid grid-cols-[0.6fr,2fr] py-6 gap-8 tablet:grid-cols-1">
          <div className="w-full flex flex-col gap-3 pr-6 border-r-[1.5px] tablet:border-none border-zinc-300 [&>main]:flex [&>main]:flex-col [&>main]:gap-4 [&>main>div]:flex [&>main>div]:flex-col [&>main>div]:w-full">
            <header>
              <h4 className="font-semibold text-base">Filter</h4>
            </header>
            <main>
              <div>
                <label htmlFor="organization">Organizations</label>
                {/* <AutocompleteInput
            id="organization"
                  options={[
                    { label: "The Shawshank Redemption", year: 1994 },
                    { label: "The Godfather", year: 1972 },
                    { label: "The Godfather: Part II", year: 1974 },
                    { label: "The Dark Knight", year: 2008 },
                    { label: "12 Angry Men", year: 1957 },
                  ]}
                /> */}
              </div>
              <div>
                <label htmlFor="keyword">Keywords</label>
                {/* <AutocompleteInput
            id="keyword"
                  options={[
                    { label: "The Shawshank Redemption", year: 1994 },
                    { label: "The Godfather", year: 1972 },
                    { label: "The Godfather: Part II", year: 1974 },
                    { label: "The Dark Knight", year: 2008 },
                    { label: "12 Angry Men", year: 1957 },
                  ]}
                /> */}
              </div>
            </main>
          </div>
          <div className="flex flex-col gap-8">
            <header className="flex items-center gap-4 justify-between border-b-[1.5px] border-info-300 pb-4">
              <p>
                <span>1400</span> results
              </p>
              <div className="flex items-center gap-2">
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
                  <MenuItem value="creation-date">Creation Date</MenuItem>
                  <MenuItem value="last-update">Last Update</MenuItem>
                </SelectInput>
              </div>
            </header>
            <main className="w-full flex flex-col gap-8">
              {data.map((item, index) => (
                <Card key={index + 1} {...item} />
              ))}
            </main>
            <footer className="flex items-center justify-center">
              <Pagination count={10} variant="outlined" shape="rounded" />
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
