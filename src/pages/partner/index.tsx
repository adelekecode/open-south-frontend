import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Seo from "~/components/seo";
import BIDS from "~/assets/images/partner-logos/bids.png";
import CHAI from "~/assets/images/partner-logos/chai.png";
import EAAMO from "~/assets/images/partner-logos/eaamo.png";
import Button from "~/components/button";
import Form from "./form";

export default function Partner() {
  const { t } = useTranslation("layout/partners");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Seo title="Our Partners" description="" />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-16 flex flex-col gap-10">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">
          {t("title")}
        </h1>
        <div className="flex flex-col gap-4 max-w-[600px] self-center mb-10 largeMobile:mb-6">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-6 [&_img]:h-[7rem] tablet:[&_img]:h-[5rem] largeMobile:flex-col largeMobile:[&_img]:!h-[initial] largeMobile:w-[12rem]">
              <a href="https://humancompatible.ai" target="_blank" rel="noopener noreferrer">
                <img src={CHAI} alt="CHAI logo" />
              </a>
              <a href="https://bids.berkeley.edu" target="_blank" rel="noopener noreferrer">
                <img src={BIDS} alt="BIDS logo" />
              </a>
              <a href="https://www.eaamo.org" target="_blank" rel="noopener noreferrer">
                <img src={EAAMO} alt="EAAMO logo" />
              </a>
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
            {t("show-form-btn")}
          </Button>
        )}

        {showForm && <Form />}
      </main>
    </>
  );
}
