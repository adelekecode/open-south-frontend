import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MenuItem, Pagination } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import SearchInput from "~/components/inputs/search-input";
import Seo from "~/components/seo";
import SelectInput from "~/components/inputs/select-input";
import Card from "./card";
import AutocompleteInput from "~/components/inputs/auto-complete-input";
import formatData from "~/utils/data/format.json";
import licenseData from "~/utils/data/license.json";
import spatialCoverageData from "~/utils/data/spatial-coverage.json";
import { usePublicDatasets } from "~/queries/dataset";
import NoData from "~/assets/illustrations/no-data.png";
import { usePublicCategories } from "~/queries/category";
import { usePublicOrganizations } from "~/queries/organizations";
import { usePublicTags } from "~/queries/tags";
import useDebounce from "~/hooks/debounce";

type SortByValue = "" | "creation_date" | "last_update";

export default function Dataset() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const datasetPerPage = 10;

  const search = searchParams.get("q") || "";
  const filterBy = {
    organization: searchParams.get("organization") || "",
    category: searchParams.get("category") || "",
    tag: searchParams.get("tag") || "",
    license: searchParams.get("license") || "",
    format: searchParams.get("format") || "",
    spatialCoverage: searchParams.get("spatial-coverage") || "",
  };
  const sortBy = searchParams.get("sort-by") || "";

  const searchParamsOption = {
    replace: true,
  };

  const { isLoading, data, refetch } = usePublicDatasets(
    useDebounce(search).trim(),
    {
      ...filterBy,
    },
    sortBy as SortByValue,
    {
      page,
      pageSize: datasetPerPage,
    }
  );

  const { data: categories, isLoading: isLoadingCategories } = usePublicCategories();
  const { data: organizations, isLoading: isLoadingOrganizations } = usePublicOrganizations();
  const { data: tags, isLoading: isLoadingTags } = usePublicTags(); //? Add pagination and search

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Seo title="Dataset" description="Checkout the dataset that have been created" />
      <main className="w-full max-w-maxAppWidth p-6 px-10 tablet:px-6 pt-0 mx-auto largeMobile:!px-4">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold mb-2">
          Datasets
        </h1>
        <p className="largeMobile:text-sm">Search among all datasets on Open South</p>
        <div className="flex flex-col gap-2 pt-4">
          <SearchInput
            placeholder="Search"
            value={search}
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                return setSearchParams((params) => {
                  params.delete("q");

                  return params;
                });
              }

              setSearchParams(
                (params) => {
                  params.set("q", value);

                  return params;
                },
                {
                  replace: true,
                }
              );
            }}
            className="w-full h-[inherit]"
            searchIcon={
              <div className="flex items-center gap-2 p-2">
                <FiSearch className="w-5 h-5 text-white" />
                <p className="text-white tablet:hidden text-base">Search</p>
              </div>
            }
            onSearch={async () => {
              await refetch();
            }}
          />
        </div>
        <div className="w-full grid grid-cols-[0.8fr,2fr] py-6 gap-6 tablet:grid-cols-1">
          <div className="w-full flex flex-col gap-3 pr-6 border-r-[1.5px] tablet:border-none border-zinc-300">
            <header>
              <h4 className="font-semibold text-base">Filter</h4>
            </header>
            <main className="flex flex-col gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-1">
              <div>
                <label htmlFor="organization">Organizations</label>
                <AutocompleteInput
                  id="organization"
                  options={organizations ? organizations.results : []}
                  getOptionLabel={(opt) => opt.name ?? opt}
                  inputParams={{
                    placeholder: "All Organizations",
                  }}
                  loading={isLoadingOrganizations}
                  value={
                    organizations?.results?.find((item) => item.slug === filterBy.organization) ||
                    null
                  }
                  isOptionEqualToValue={(option, value) => option.slug === value.slug}
                  onChange={(_, val) => {
                    const chosenValue = val;

                    if (!chosenValue) {
                      return setSearchParams((params) => {
                        params.delete("organization");

                        return params;
                      });
                    }

                    if (chosenValue) {
                      setSearchParams((params) => {
                        params.set("organization", chosenValue.slug);

                        return params;
                      });
                    }
                  }}
                />
              </div>
              <div>
                <label htmlFor="tag">Tags</label>
                <AutocompleteInput
                  id="tag"
                  options={tags?.results || ([] as Dataset["tags_data"])}
                  getOptionLabel={(opt) => opt.name ?? opt}
                  inputParams={{
                    placeholder: "All Tags",
                  }}
                  loading={isLoadingTags}
                  value={tags?.results?.find((item) => item.name === filterBy.tag) || null}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  onChange={(_, val) => {
                    const chosenValue = val;

                    if (!chosenValue) {
                      return setSearchParams((params) => {
                        params.delete("tag");

                        return params;
                      });
                    }

                    if (chosenValue) {
                      setSearchParams((params) => {
                        params.set("tag", chosenValue.name);

                        return params;
                      });
                    }
                  }}
                />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <AutocompleteInput
                  id="category"
                  inputParams={{
                    placeholder: "All Categories",
                  }}
                  options={categories || ([] as Category[])}
                  getOptionLabel={(opt) => opt.name ?? opt}
                  loading={isLoadingCategories}
                  value={categories?.find((item) => item.slug === filterBy.category) || null}
                  isOptionEqualToValue={(option, value) => option.slug === value.slug}
                  onChange={(_, val) => {
                    const chosenValue = val;

                    if (!chosenValue) {
                      return setSearchParams((params) => {
                        params.delete("category");

                        return params;
                      });
                    }

                    if (chosenValue) {
                      setSearchParams((params) => {
                        params.set("category", chosenValue.slug);

                        return params;
                      });
                    }
                  }}
                />
              </div>
              <div>
                <label htmlFor="format">Formats</label>
                <AutocompleteInput
                  id="format"
                  inputParams={{
                    placeholder: "All Formats",
                  }}
                  options={formatData}
                  value={formatData.find((item) => item.label === filterBy.format) || null}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  onChange={(_, val) => {
                    const chosenValue = val;

                    if (!chosenValue) {
                      return setSearchParams((params) => {
                        params.delete("format");

                        return params;
                      });
                    }

                    if (chosenValue) {
                      setSearchParams((params) => {
                        params.set("format", chosenValue.label);

                        return params;
                      });
                    }
                  }}
                />
              </div>
              <div>
                <label htmlFor="licenses">Licenses</label>
                <AutocompleteInput
                  id="license"
                  inputParams={{
                    placeholder: "All Licenses",
                  }}
                  getOptionLabel={(opt) => opt.name ?? opt}
                  options={licenseData}
                  value={licenseData.find((item) => item.name === filterBy.license) || null}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  onChange={(_, val) => {
                    const chosenValue = val;

                    if (!chosenValue) {
                      return setSearchParams((params) => {
                        params.delete("license");

                        return params;
                      });
                    }

                    if (chosenValue) {
                      setSearchParams((params) => {
                        params.set("license", chosenValue.name);

                        return params;
                      });
                    }
                  }}
                />
              </div>
              <div>
                <label htmlFor="spatial-coverage">Spatial coverage</label>
                <AutocompleteInput
                  id="spatial-coverage"
                  inputParams={{
                    placeholder: "All Spatial Coverage",
                  }}
                  options={spatialCoverageData}
                  value={
                    spatialCoverageData.find((item) => item.label === filterBy.spatialCoverage) ||
                    null
                  }
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  onChange={(_, val) => {
                    const chosenValue = val;

                    if (!chosenValue) {
                      return setSearchParams((params) => {
                        params.delete("spatial-coverage");

                        return params;
                      });
                    }

                    if (chosenValue) {
                      setSearchParams((params) => {
                        params.set("spatial-coverage", chosenValue.label);

                        return params;
                      });
                    }
                  }}
                />
              </div>
            </main>
          </div>
          <div className="flex flex-col gap-8">
            <header className="flex items-center gap-4 justify-between border-b-[1.5px] border-info-300 pb-4">
              <p>
                <span>{data ? data.count : "0"}</span> results
              </p>
              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap text-sm">Sort by:</p>
                <SelectInput
                  className="min-w-[210px]"
                  value={sortBy}
                  onChange={(e) => {
                    const value = e.target.value as string;

                    if (!value) {
                      return setSearchParams((params) => {
                        params.delete("sort-by");

                        return params;
                      });
                    }

                    setSearchParams((params) => {
                      params.set("sort-by", value);

                      return params;
                    }, searchParamsOption);
                  }}
                >
                  <MenuItem value="">Relevance</MenuItem>
                  <MenuItem value="creation_date">Creation Date</MenuItem>
                  <MenuItem value="last_update">Last Update</MenuItem>
                </SelectInput>
              </div>
            </header>
            {isLoading ? (
              <div className="mb-8 w-full flex flex-col gap-8">
                {Array.from({ length: 5 }).map((_, index) => (
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
            ) : data?.results && data.results.length > 0 ? (
              <>
                <main className="w-full flex flex-col gap-8">
                  {data.results.map((item, index) => (
                    <Card key={index + 1} {...item} />
                  ))}
                </main>
                <footer className="flex items-center justify-center">
                  <Pagination
                    count={Math.ceil(data.count / datasetPerPage)}
                    page={page}
                    onChange={(_, page) => {
                      setPage(page);
                    }}
                    variant="outlined"
                    shape="rounded"
                  />
                </footer>
              </>
            ) : (
              <div className="flex items-center justify-center w-full flex-col">
                <figure className="w-[250px] aspect-square">
                  <img
                    src={NoData}
                    className="w-full h-full object-covers"
                    alt="No category data illustration"
                  />
                </figure>
                <p className="text-base font-semibold">No dataset found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
