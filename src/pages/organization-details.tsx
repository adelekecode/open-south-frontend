import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import Seo from "~/components/seo";
import dataset from "~/utils/data/dataset.json";

export default function OrganizationDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = {
    id: state.id || Math.random(),
    title: state.name || "National Institute of Statistics and Economic Studies (INSEE)",
    slug: "national-institute-of-statistics-and-economic-studies-insee",
    description:
      "The National Institute of Statistics and Economic Studies (Insee) collects, produces, analyzes and disseminates information on the French economy and society. This information is of interest to public authorities, administrations, businesses, researchers, the media, teachers, students and individuals. They allow them to enrich their knowledge, carry out studies, make forecasts and make decisions. To satisfy its users, INSEE listens to their needs and directs its work accordingly while pursuing one main objective: to shed light on the economic and social debate.",
    image: "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
  };

  return (
    <>
      <Seo title={data.title || ""} description={data.description || ""} />
      <main className="w-full pb-16 flex flex-col gap-4">
        <div className="bg-primary-50 pt-16 pb-8">
          <header className="flex flex-col gap-6 max-w-maxAppWidth mx-auto px-10 tablet:px-6 largeMobile:!px-4">
            <figure className="w-[7rem] aspect-square border p-2 bg-white">
              <img
                src={data.image}
                alt="organization logo"
                className="w-full h-full object-contain"
              />
            </figure>
            <h1 className="text-2xl font-semibold">{data.title || "----------"}</h1>
          </header>
        </div>
        <main className="max-w-maxAppWidth mx-auto flex flex-col gap-12 p-6 px-10 tablet:px-6 largeMobile:!px-4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-base">Description</h2>
            <p className="text-sm">{data.description}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-semibold text-base">Datasets</h2>
              <Link
                to={{
                  pathname: "/datasets",
                  search: `?${new URLSearchParams({
                    organization: data.slug,
                  }).toString()}`,
                }}
                className="flex items-center gap-4 border-b-[1.5px] border-primary-600 hover:border-primary-700"
              >
                <p className="text-primary-600 text-sm">See more datasets</p>
                <FaAngleRight className="text-primary-600 text-xs" />
              </Link>
            </div>
            <div className="grid grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 gap-6">
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
                    <figure className="w-full border border-zinc-300 bg-white">
                      <img
                        className="w-full h-full object-cover"
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
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-base">General Statistics</h2>
            <div className="flex items-start gap-16 [&>div]:flex [&>div]:flex-col [&>div>p]:text-sm [&>div>p]:font-medium [&>div>h3]:text-4xl [&>div>h3]:font-bold">
              <div>
                <p>Datasets</p>
                <h3>317</h3>
              </div>
              <div>
                <p>Views</p>
                <h3>4.3M</h3>
              </div>
              <div>
                <p>Downloads</p>
                <h3>1.2M</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-base">Technical Details</h2>
            <div className="grid gap-8 grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 [&>div]:flex [&>div]:flex-col [&>div>h3]:font-semibold [&>div>h3]:text-sm">
              <div>
                <h3>Latest dataset update</h3>
                <p>November 29, 2023</p>
              </div>
              <div>
                <h3>Organization creation date</h3>
                <p>April 17, 2014</p>
              </div>
              <div>
                <h3>ID</h3>
                <p>534fff94a3a7292c64a77fc1</p>
              </div>
            </div>
          </div>
        </main>
      </main>
    </>
  );
}
