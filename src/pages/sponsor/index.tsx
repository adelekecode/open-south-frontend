import { useState } from "react";
import Seo from "~/components/seo";
import Bus from "~/assets/images/sponsor-logos/bus.svg";
import AnalyzeBoston from "~/assets/images/sponsor-logos/analyze-boston.svg";
import Dribbble from "~/assets/images/sponsor-logos/dribbble.svg";
import Car from "~/assets/images/sponsor-logos/car.png";
import Button from "~/components/button";
import Form from "./form";

export default function Sponsor() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Seo title="Our Sponsor" description="" />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-16 flex flex-col gap-10">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">
          Our Sponsors
        </h1>
        <div className="flex flex-col gap-4 max-w-[600px] self-center mb-10">
          <h4 className="text-sm font-semibold">Top Sponsors</h4>
          <div className="flex flex-col">
            <img src={Bus} className="w-[130px] aspect-square self-center" alt="sponsor logo" />
            <div className="grid gap-4 grid-cols-[170px,170px] [&>figure]:w-full [&>figure]:aspect-square [&>figure>img]:w-full [&>figure>img]:h-full [&>figure>img]:object-contain self-center">
              <figure>
                <img src={AnalyzeBoston} alt="sponsor logo" />
              </figure>
              <figure>
                <img src={Dribbble} alt="sponsor logo" />
              </figure>
            </div>
            <div className="flex flex-col mt-4">
              <h4 className="text-sm font-semibold">Other Sponsors</h4>
              <div className="grid gap-4 grid-cols-4 [&>figure]:w-full [&>figure]:aspect-square [&>figure>img]:w-full [&>figure>img]:h-full [&>figure>img]:object-contain self-center">
                <figure>
                  <img src={AnalyzeBoston} alt="sponsor logo" />
                </figure>
                <figure>
                  <img src={Dribbble} alt="sponsor logo" />
                </figure>
                <figure>
                  <img src={Car} alt="sponsor logo" />
                </figure>
                <figure>
                  <img src={Bus} alt="sponsor logo" />
                </figure>
              </div>
            </div>
          </div>
        </div>
        {!showForm && (
          <Button
            className="!w-fit self-center"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Become a sponsor
          </Button>
        )}

        {showForm && <Form />}
      </main>
    </>
  );
}
