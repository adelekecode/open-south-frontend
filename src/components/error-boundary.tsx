import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "~/components/button";
import ErrorOccured from "~/assets/illustrations/error-occured.png";

export default function ErrorBoundary() {
  const { t } = useTranslation("components/error-boundary");

  const error = useRouteError();

  console.error(error);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-2 p-8">
        <figure className="w-[28%] largeMobile:w-[55%] mediumMobile:!w-[70%]">
          <img src={ErrorOccured} alt="Error Boundary Illustration" />
        </figure>
        <p className="mt-6 mb-2 text-center mediumMobile:text-sm">{t("contents")}</p>
        <div className="flex items-center mt-4 justify-center">
          <Button onClick={() => window.location.reload()}>{t("cta-btn")}</Button>
        </div>
      </div>
    </>
  );
}
