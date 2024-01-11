import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import data from "~/utils/data/category.ts";

export default function Category() {
  return (
    <section className="w-full max-w-maxAppWidth mx-auto p-8 tablet:px-5 largeMobile:!px-4 py-12 flex flex-col gap-4">
      <header className="flex items-center flex-wrap justify-between gap-4">
        <h2 className="text-2xl largeMobile:text-xl font-semibold">Categories</h2>
        <div className="flex items-center gap-6 ml-auto">
          <Link
            to={"/categories"}
            className="flex items-center gap-4 border-b-[1.5px] border-primary-600 hover:border-primary-700"
          >
            <p className="text-primary-600 text-sm largeMobile:text-xs">See more categories</p>
            <FaAngleRight className="text-primary-600 text-xs" />
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:550px)]:!grid-cols-1 gap-6 tablet:gap-4">
        {data.slice(0, 3).map((item, index) => {
          const { slug, illustration, description, label } = item;

          return (
            <Link
              key={index + 1}
              to={{
                pathname: "/datasets",
                search: `?${new URLSearchParams({
                  category: slug,
                }).toString()}`,
              }}
              className="flex flex-col border-[1.5px] border-info-200 hover:bg-info-50"
            >
              <figure className="bg-primary-50 flex items-center justify-center p-4 w-full max-h-[200px] aspect-[1/0.1]">
                <img
                  src={illustration}
                  alt={`${name} category`}
                  className="object-contain w-full h-full"
                />
              </figure>
              <div className="flex flex-col items-start gap-4 p-4">
                <h2 className="text-base font-semibold">{label}</h2>
                <p className="text-start text-sm">{description}</p>
              </div>
            </Link>
          );
        })}
      </main>
    </section>
  );
}
