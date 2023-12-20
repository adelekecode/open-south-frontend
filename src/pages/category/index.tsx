import Seo from "~/components/seo";
import { usePublicCategories } from "~/queries/category";
import Item from "./item";
import NoData from "~/assets/illustrations/no-data.png";

export default function Category() {
  const { isLoading, data } = usePublicCategories();

  return (
    <>
      <Seo
        title="Categories of datasets"
        description="Explore a variety of dataset categories, including environment, education, urbanization, and more. Find valuable insights and information across different thematic areas."
      />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-6 largeMobile:!px-4 pt-0 pb-16 flex flex-col gap-16">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl tablet:text-3xl largeMobile:!text-xl font-semibold">
            Categories of datasets
          </h1>
          <p className="largeMobile:text-sm">
            Explore a variety of dataset categories, including environment, education, urbanization,
            and more. Find valuable insights and information across different thematic areas.
          </p>
        </header>
        {isLoading ? (
          <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:550px)]:!grid-cols-1 gap-6 tablet:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index + 1}
                className="w-full aspect-square animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        ) : data ? (
          <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:550px)]:!grid-cols-1 gap-6 tablet:gap-4">
            {data.map((item, index) => (
              <Item key={index + 1} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full flex-col">
            <figure className="w-[250px] aspect-square">
              <img
                src={NoData}
                className="w-full h-full object-covers"
                alt="No category data illustration"
              />
            </figure>
            <p className="text-base font-semibold">No category found</p>
          </div>
        )}
      </main>
    </>
  );
}
