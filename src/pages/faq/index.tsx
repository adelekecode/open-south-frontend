import Seo from "~/components/seo";
import FaqData from "~/utils/data/faq.json";
import Question from "./question";

export default function Faq() {
  return (
    <>
      <Seo title="FAQ" description="Find answers to frequently asked questions on our FAQ page." />
      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-4">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">FAQ</h1>
        <div className="flex flex-col gap-8 [&_button]:text-[initial] p-4 px-8 tablet:px-0 largeMobile:pt-0">
          {FaqData.map((item) => (
            <Question {...item} />
          ))}
        </div>
      </main>
    </>
  );
}
