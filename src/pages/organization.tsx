import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuItem, Pagination } from "@mui/material";
import { stripHtml } from "string-strip-html";
import slugify from "slugify";
import { FiSearch } from "react-icons/fi";
import SearchInput from "~/components/inputs/search-input";
import SelectInput from "~/components/inputs/select-input";
import Seo from "~/components/seo";
import { usePublicOrganizations } from "~/queries/organizations";
import NoData from "~/assets/illustrations/no-data.png";
import useDebounce from "~/hooks/debounce";

type SortByValue = "relevance" | "most-recent";

export default function Organization() {
  const navigate = useNavigate();
  const { t } = useTranslation("layout/organization");

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const dataPerPage = 12;

  const search = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort-by") || "";

  const searchParamsOption = {
    replace: true,
  };

  const { isLoading, data, refetch } = usePublicOrganizations(
    useDebounce(search).trim(),
    sortBy as SortByValue,
    // (sortBy || "relevance") as SortByValue,
    {
      page,
      pageSize: dataPerPage,
    }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Seo title="Organization" description="" />
      <main className="w-full max-w-maxAppWidth p-6 px-10 tablet:px-6 pt-0 mx-auto largeMobile:!px-4 pb-16">
        <h1 className="text-3xl largeMobile:!text-2xl font-semibold mb-2">{t("title")}</h1>
        <p className="tablet:text-sm">{t("subtitle", { company_name: "Open South" })}</p>
        <div className="flex flex-col gap-2 pt-4">
          <SearchInput
            placeholder={t("search.placeholder")}
            className="w-full h-[inherit]"
            searchIcon={
              <div className="flex items-center gap-2 p-2">
                <FiSearch className="w-5 h-5 text-white" />
                <p className="text-white tablet:hidden text-base">{t("search.button")}</p>
              </div>
            }
            value={search}
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                return setSearchParams((params) => {
                  params.delete("q");

                  return params;
                });
              }

              setSearchParams((params) => {
                params.set("q", value);

                return params;
              }, searchParamsOption);
            }}
            onSearch={async () => {
              await refetch();
            }}
          />
        </div>
        <header className="flex items-center flex-wrap largeMobile:flex-col gap-6 justify-between py-6">
          <p className="self-start">{t("result", { value: data?.count || 0 })}</p>
          <div className="flex items-center gap-2 largeMobile:w-full largeMobile:flex-col largeMobile:items-start">
            <p className="whitespace-nowrap text-sm">{t("sort-by.text")}:</p>
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
              <MenuItem value="">{t("sort-by.dropdown.relevance")}</MenuItem>
              <MenuItem value="most-recent">{t("sort-by.dropdown.most-recent")}</MenuItem>
            </SelectInput>
          </div>
        </header>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4 tablet:grid-cols-2 [@media(max-width:560px)]:grid-cols-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index + 1} className="border rounded-md flex flex-col p-4 gap-7">
                <div className="flex items-center gap-5">
                  <div className="w-20 rounded aspect-square animate-pulse bg-gray-200" />
                  <div className="w-28 rounded-sm h-6 animate-pulse bg-gray-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full rounded-sm h-4 animate-pulse bg-gray-200" />
                  <div className="w-full rounded-sm h-4 animate-pulse bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : data && data.results.length > 0 ? (
          <main className="flex flex-col gap-12">
            <div className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
              {data.results.map((item, index) => {
                const { name, slug, logo, description, data_count } = item;

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
                    <Link
                      className="px-4 py-1 rounded-full bg-primary-100 hover:bg-primary-300 transition-all text-sm text-primary-700"
                      key={index + 1}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      to={{
                        pathname: "/datasets",
                        search: `?${new URLSearchParams({
                          organization: `${slugify(name, {
                            lower: true,
                            strict: true,
                            trim: true,
                          })}`,
                        }).toString()}`,
                      }}
                    >
                      <span className="font-semibold">{data_count}</span> {t("org-card.datasets")}
                    </Link>
                  </button>
                );
              })}
            </div>
            <footer className="flex items-center justify-center">
              <Pagination
                count={Math.ceil(data.count / dataPerPage)}
                page={page}
                onChange={(_, page) => {
                  setPage(page);
                }}
                variant="outlined"
                shape="rounded"
              />
            </footer>
          </main>
        ) : (
          <div className="flex items-center justify-center w-full flex-col">
            <figure className="w-[250px] aspect-square">
              <img
                src={NoData}
                className="w-full h-full object-covers"
                alt="No organization data illustration"
              />
            </figure>
            <p className="text-base font-semibold">No organization found</p>
          </div>
        )}
      </main>
    </>
  );
}
