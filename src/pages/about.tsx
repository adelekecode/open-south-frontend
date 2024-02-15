import { useEffect } from "react";
import Seo from "~/components/seo";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Seo title="About" description="See what we are about" />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-8 flex flex-col gap-6">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">
          About Open South
        </h1>
        <div className="flex flex-col gap-4">
          <p>
            Welcome to Open South, your premier open data platform designed to empower researchers,
            scholars, practitioners, policymakers, and communities within countries in the Global
            South. Our mission is to facilitate access to valuable data, foster collaboration, and
            promote sustainable development across diverse domains.
          </p>
          <p>
            At Open South, we believe that access to data is a fundamental driver of progress. We
            recognize the immense potential that lies within the rich tapestry of information and
            knowledge that exists in the Global South. Our platform serves as a gateway to unlock
            this potential by providing a comprehensive repository of open data.
          </p>
          <p>
            We are committed to the principles of openness and transparency. All the data available
            on Open South is freely downloadable, enabling easy sharing and utilization by our
            users. We firmly believe in the power of collaboration and the transformative impact it
            can have on societies. By encouraging the sharing of data, we promote interdisciplinary
            research, evidence-based decision-making, and innovation across multiple sectors.
          </p>
          <p>
            User engagement and capacity building are at the core of our philosophy. We understand
            that a vibrant and thriving community lies at the heart of any successful platform. Open
            South provides various interactive data visualization and modeling features. Through
            these features, we aim to encourage active participation, knowledge exchange, and foster
            a better understanding of the data.
          </p>
          <p>
            Accessibility and localization are key pillars of our platform. We strive to ensure that
            Open South is accessible to individuals and communities across the Global South. We
            actively work towards enhancing platform accessibility, addressing language barriers,
            and accommodating diverse technological infrastructures. By doing so, we aim to create
            an inclusive space where knowledge can flow freely, unencumbered by geographical or
            technical limitations.
          </p>
          <p>
            We invite you to join our vibrant community and explore the wealth of data and knowledge
            available on Open South. Whether you are a researcher seeking valuable insights, a
            policymaker in pursuit of evidence-based solutions, or a community member passionate
            about driving positive change, our platform is here to support your journey. Together,
            let us harness the power of open data to shape a brighter future for the Global South.
          </p>
          <p className="mt-4 text-lg">
            <span className="font-medium">Welcome to Open South</span> –{" "}
            <span className="font-Marhey">where data transforms possibilities</span>
          </p>
        </div>
      </main>
    </>
  );
}
