import { useState } from "react";
import Seo from "~/components/seo";
import BIDS from "~/assets/images/partner-logos/bids.png";
import CHAI from "~/assets/images/partner-logos/chai.png";
import Button from "~/components/button";
import Form from "./form";

export default function Partner() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Seo title="Our Partners" description="" />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-16 flex flex-col gap-10">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">
          Our Partners
        </h1>
        <div className="flex flex-col gap-4 max-w-[600px] self-center mb-10">
          {/* <h4 className="text-sm font-semibold">Top Partners</h4> */}
          <div className="flex flex-col">
            {/* <img src={Bus} className="w-[130px] aspect-square self-center" alt="partner logo" /> */}
            <div className="grid gap-12 grid-cols-[200px,200px] items-center [&>figure]:w-full [&>figure]:h-fit [&>figure>img]:w-full [&>figure>img]:object-contain self-center [@media(max-width:600px)]:grid-cols-[200px] [@media(max-width:600px)]:gap-8">
              <figure>
                <img src={CHAI} alt="CHAI logo" />
              </figure>
              <figure>
                <img src={BIDS} alt="partner logo" />
              </figure>
            </div>
            {/* <div className="flex flex-col mt-4">
              <h4 className="text-sm font-semibold">Other Partners</h4>
              <div className="grid gap-4 grid-cols-4 [&>figure]:w-full [&>figure]:aspect-square [&>figure>img]:w-full [&>figure>img]:h-full [&>figure>img]:object-contain self-center"></div>
            </div> */}
          </div>
        </div>
        {!showForm && (
          <Button
            className="!w-fit self-center"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Become a partner
          </Button>
        )}

        {showForm && <Form />}
      </main>
    </>
  );
}
