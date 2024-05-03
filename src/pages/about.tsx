import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Seo from "~/components/seo";

export default function About() {
  const { t } = useTranslation("layout/about");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const option = { company_name: "Open South" };

  return (
    <>
      <Seo title="About" description="See what we are about" />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-8 flex flex-col gap-6">
        <h1 className="text-3xl largeMobile:!text-2xl font-semibold">{t("title", option)}</h1>
        <div className="flex flex-col gap-4">
          <p>{t("body.1", option)}</p>
          <p>{t("body.2", option)}</p>
          <p>{t("body.3", option)}</p>
          <p>{t("body.4", option)}</p>
          <p>{t("body.5", option)}</p>
          <p>{t("body.6", option)}</p>
          <p className="mt-4 text-lg tablet:text-base largeMobile:!text-sm">
            <span className="font-medium">{t("body.footnote.welcome", option)}</span> –{" "}
            <span className="font-Marhey">{t("body.footnote.extra", option)}</span>
          </p>
        </div>
      </main>
    </>
  );
}
