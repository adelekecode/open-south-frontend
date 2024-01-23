import { useNavigate } from "react-router-dom";
import moment from "moment";
import { stripHtml } from "string-strip-html";
import Seo from "~/components/seo";
import { usePublicNews } from "~/queries/news";
import NoData from "~/assets/illustrations/no-data.png";

export default function News() {
  const navigate = useNavigate();

  const { data, isLoading } = usePublicNews();

  return (
    <>
      <Seo title="News" description="Check out our latest news" />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-12 flex flex-col gap-8">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">News</h1>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4 tablet:grid-cols-2 [@media(max-width:600px)]:grid-cols-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index + 1} className="flex flex-col p-1 gap-4">
                <div className="animate-pulse bg-gray-200 w-full h-[210px]" />
                <div className="flex flex-col gap-2">
                  <div className="w-[60%] rounded-sm h-5 animate-pulse bg-gray-200" />
                  <div className="w-[40%] rounded-sm h-3 animate-pulse bg-gray-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full rounded-sm h-3 animate-pulse bg-gray-200" />
                  <div className="w-full rounded-sm h-3 animate-pulse bg-gray-200" />
                  <div className="w-[50%] rounded-sm h-3 animate-pulse bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : data && data.results.length > 0 ? (
          <div className="grid grid-cols-3 [@media(max-width:900px)]:grid-cols-2 [@media(max-width:550px)]:!grid-cols-1 gap-6 tablet:gap-4">
            {data.results.map((item, index) => {
              const { title, slug, body, image_url, published_at } = item;

              const stripedDescription = stripHtml(`${body}`, {
                stripTogetherWithTheirContents: ["style", "pre"],
              }).result;

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
                      src={image_url || ""}
                      alt={`${title} banner`}
                      className="object-cover w-full h-full"
                    />
                  </figure>
                  <div className="flex flex-col items-start gap-4 p-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <h5 className="text-sm font-medium">
                      Published on{" "}
                      {published_at ? moment(published_at).format("MMMM D, YYYY") : "-----"}
                    </h5>
                    <p className="text-start text-sm">
                      {stripedDescription.length > 300
                        ? stripedDescription.substring(0, 300).split(" ").slice(0, -1).join(" ") +
                          "..."
                        : stripedDescription}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full flex-col">
            <figure className="w-[250px] aspect-square">
              <img
                src={NoData}
                className="w-full h-full object-covers"
                alt="No news data illustration"
              />
            </figure>
            <p className="text-base font-semibold">No news for now</p>
          </div>
        )}
      </main>
    </>
  );
}
