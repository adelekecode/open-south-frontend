import data from "~/utils/data/category";
import Seo from "~/components/seo";
import Item from "./item";

export default function Category() {
  return (
    <>
      <Seo
        title="Categories of datasets"
        description="Explore a variety of dataset categories, including environment, education, urbanization, and more. Find valuable insights and information across different thematic areas."
      />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-6 largeMobile:!px-4 pt-0 pb-16 flex flex-col gap-16">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">
            Categories of datasets
          </h1>
          <p>
            Explore a variety of dataset categories, including environment, education, urbanization,
            and more. Find valuable insights and information across different thematic areas.
          </p>
        </header>
        <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:550px)]:!grid-cols-1 gap-6 tablet:gap-4">
          {data.map((item, index) => (
            <Item key={index + 1} {...item} />
          ))}
        </div>
      </main>
    </>
  );
}
