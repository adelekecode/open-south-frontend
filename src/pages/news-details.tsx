import { useParams } from "react-router-dom";
import moment from "moment";
import Seo from "~/components/seo";
import newsData from "~/utils/data/news.json";
import NotFound from "./404";

export default function NewsDetails() {
  const { slug } = useParams();

  const data = newsData.find((item) => item.slug === slug);

  if (!data) {
    return <NotFound />;
  }

  return (
    <>
      <Seo title={data.title || ""} description={data.description || ""} />
      <main className="max-w-maxAppWidth mx-auto flex flex-col gap-6 p-6 px-10 pt-0 pb-16 tablet:px-6 largeMobile:!px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-sm font-medium">
            Published on {moment(data.publishedAt).format("MMMM D, YYYY")}
          </p>
        </div>
        <figure className="w-full aspect-video">
          <img src={data.banner} className="object-cover w-full h-full" alt="banner" />
        </figure>
        <p>{data.description}</p>
      </main>
    </>
  );
}
