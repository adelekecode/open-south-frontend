import { useNavigate } from "react-router-dom";
import moment from "moment";
import Seo from "~/components/seo";
import data from "~/utils/data/news.json";

export default function News() {
  const navigate = useNavigate();

  return (
    <>
      <Seo title="News" description="See what we are about" />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-12 flex flex-col gap-12">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">News</h1>
        <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:550px)]:!grid-cols-1 gap-6 tablet:gap-4">
          {data.map((item, index) => {
            const { title, slug, banner, description, publishedAt } = item;

            return (
              <button
                key={index + 1}
                onClick={() => {
                  navigate(`./${slug}`, {
                    state: {
                      name: title,
                    },
                  });
                }}
                className="flex flex-col hover:bg-info-50"
              >
                <figure className="bg-primary-50 flex items-center justify-center w-full h-[210px]">
                  <img
                    src={banner}
                    alt={`${title} banner`}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="flex flex-col items-start gap-4 p-4">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <h5 className="text-sm font-medium">
                    Published on {moment(publishedAt).format("MMMM D, YYYY")}
                  </h5>
                  <p className="text-start text-sm">
                    {description.length > 150
                      ? description.substring(0, 150).split(" ").slice(0, -1).join(" ") + "..."
                      : description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}
