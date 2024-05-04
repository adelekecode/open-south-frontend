import { useTranslation } from "react-i18next";
import { useGetPanelData } from "~/queries/home";

export default function Panel() {
  const { t } = useTranslation("layout/home");

  const { data } = useGetPanelData();

  return (
    <div className="w-full max-w-maxAppWidth p-6 tablet:px-5 largeMobile:!px-4 mx-auto">
      <div className="shadow-md rounded-lg w-full p-6 gap-5 flex flex-col">
        <h3 className="text-base font-semibold">Open South</h3>
        <div className="flex justify-between flex-wrap gap-8 [&>div]:flex [&>div]:gap-3 [&>div>span]:bg-primary-700 [&>div>span]:rounded-full [&>div>span]:w-1 [&>div>div]:flex [&>div>div]:items-start [&>div>div]:flex-col [&>div>div]:gap-1 [&>div>div>h1]:text-3xl [&>div>div>h1]:font-semibold [&>div>div>p]:text-zinc-700">
          <div>
            <span></span>
            <div>
              <h1>{data?.datasets || "0"}</h1>
              <p>{t("panel.datasets")}</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>{data?.files || "0"}</h1>
              <p>{t("panel.files")}</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>{data?.categories || "0"}</h1>
              <p>{t("panel.categories")}</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>{data?.users || "0"}</h1>
              <p>{t("panel.users")}</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>{data?.organisations || "0"}</h1>
              <p>{t("panel.organizations")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
