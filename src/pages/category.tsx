import { Link } from "react-router-dom";
import Environment from "~/assets/illustrations/categories/environment.png";
import Seo from "~/components/seo";

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
        <div className="grid grid-cols-4 gap-4">
          <Link
            to={{
              pathname: "/datasets",
              search: `?${new URLSearchParams({
                category: "environment",
              }).toString()}`,
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
          </Link>
        </div>
      </main>
    </>
  );
}
