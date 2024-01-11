import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import dataset from "~/utils/data/dataset.json";

export default function Dataset() {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-maxAppWidth mx-auto p-8 tablet:px-5 largeMobile:!px-4 py-12 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Datasets</h2>
        <div className="flex items-center gap-6">
          <Link
            to={"/datasets"}
            className="flex items-center gap-4 border-b-[1.5px] border-primary-600 hover:border-primary-700"
          >
            <p className="text-primary-600 text-sm">See more datasets</p>
            <FaAngleRight className="text-primary-600 text-xs" />
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
        {dataset.slice(0, 9).map((item, index) => {
          const { slug, title, organization, user } = item;

          return (
            <button
              key={index + 1}
              onClick={() => {
                navigate(`/datasets/${slug}`, {
                  state: {
                    name: item.title,
                  },
                });
              }}
              className="grid grid-cols-[80px,1fr] tabletAndBelow:grid-cols-[70px,1fr] gap-4 border-[1.5px] border-info-100 p-4 hover:bg-info-50"
            >
              <figure className="w-full border border-zinc-300 bg-white aspect-square p-1">
                <img
                  className="w-full h-full object-contain"
                  src={organization ? organization.image : user ? user.image : ""}
                  alt="organization or profile photo"
                  loading="lazy"
                />
              </figure>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-start capitalize">{title}</h1>
                <p className="text-start text-xs">
                  <span className="pr-1">by</span>
                  {organization ? (
                    <Link
                      className="text-start text-primary-600 capitalize hover:underline relative z-10"
                      to={`/organization/${organization.slug}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {organization.name}
                    </Link>
                  ) : user ? (
                    <span className="capitalize">{`${user.firstName} ${user.lastName}`}</span>
                  ) : (
                    "-------"
                  )}
                </p>
              </div>
            </button>
          );
        })}
      </main>
    </section>
  );
}
