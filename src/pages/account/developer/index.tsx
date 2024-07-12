import { useTranslation } from "react-i18next";
import moment from "moment";
import AgreementModal from "./agreement-modal";
import Button from "~/components/button";
import { notifySuccess } from "~/utils/toast";
import { useCurrentUser, useGetAPIKey } from "~/queries/user";
import { useGenerateAPIKey } from "~/mutations/user";
import Container from "~/components/dashboards/container";
import Heading from "~/components/dashboards/heading";
import { useGetDeveloperLogs } from "~/queries/developers";
import NoData from "~/assets/illustrations/no-data.png";
import DashboardLoader from "~/components/loader/dashboard-loader";

export default function Developer() {
  const { t } = useTranslation("dashboard-layout/account/developer");

  const { data: currentUser } = useCurrentUser(undefined, {
    enabled: false,
  });

  const { data: apiKey, isLoading: APIKeyisLoading } = useGetAPIKey({
    options: {
      enabled: !!currentUser?.meta?.developer_enabled,
    },
  });

  const { data: logs } = useGetDeveloperLogs();
  const { mutateAsync: generateAPIKey, isLoading } = useGenerateAPIKey();

  if (currentUser?.meta?.developer_enabled && APIKeyisLoading) {
    return <DashboardLoader />;
  }

  async function copyToClip() {
    const copyData = `${apiKey?.token}`;

    await navigator.clipboard.writeText(copyData);

    notifySuccess("API key copied");
  }

  return (
    <>
      <Container
        header={
          <header className="flex items-center gap-8 justify-between">
            <Heading>{t("title")}</Heading>
            <Button
              variant="outlined"
              size="small"
              href={import.meta.env.VITE_OPEN_SOUTH_DEVELOPER_DOCS}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("go-to-docs")}
            </Button>
          </header>
        }
        className="rounded-md flex flex-col divide-y p-8 tablet:p-6 largeMobile:!p-4"
      >
        <section className="flex flex-col gap-6 pb-8">
          <div className="flex flex-col gap-6 w-full">
            <header className="flex flex-col gap-1">
              <h3 className="font-semibold">API Key</h3>
              <small>The API key below is used to access datasets outside of our website.</small>
            </header>
            <div className="p-1 pl-4 rounded border flex items-center max-w-[80%] tablet:w-full tablet:max-w-[initial]">
              <p className="w-fit text-sm">
                {currentUser?.meta?.developer_enabled ? apiKey?.token : "********************"}
              </p>
              <Button
                size="small"
                variant="outlined"
                color="info"
                className="!text-xs !py-2 !px-3 !ml-auto !rounded !w-fit !min-w-fit"
                onClick={copyToClip}
              >
                Copy
              </Button>
            </div>
          </div>
          <Button
            loading={isLoading}
            onClick={async () => await generateAPIKey()}
            size="medium"
            className="!w-fit !ml-auto"
          >
            Regenerate API Key
          </Button>
        </section>
        <section className="flex flex-col gap-6 pt-8">
          <header className="flex flex-col gap-1">
            <h3 className="font-semibold">API Logger</h3>
            <small>
              The logger will help you see the requests you are making and the time they were made.
            </small>
          </header>
          <div className="border border-info-100 px-4 rounded w-full overflow-x-auto">
            <header className="flex [&_h4]:text-sm border-b py-2 w-full">
              <div className="w-[250px] px-2">
                <h4>Time</h4>
              </div>
              <div className="w-[150px] px-2">
                <h4>Method</h4>
              </div>
              <div className="w-[150px] px-2">
                <h4 className="whitespace-nowrap">Status</h4>
              </div>
              <div className="w-full px-2">
                <h4>Path</h4>
              </div>
            </header>
            {logs && !!logs.results ? (
              <main className="w-full flex flex-col divide-y">
                {logs.results.map(
                  (
                    { created_at, meta: { request_method, request_path, request_status_code } },
                    index
                  ) => (
                    <div key={index} className="flex [&_p]:text-sm py-4">
                      <div className="w-[250px] px-2">
                        <p className="whitespace-nowrap">
                          {moment(created_at).format("MMM DD HH:mm:ss.SS")}
                        </p>
                      </div>
                      <div className="w-[150px] px-2">
                        <p className="font-semibold uppercase text-zinc-800/50">{request_method}</p>
                      </div>
                      <div className="w-[150px] px-2">
                        <p>{request_status_code}</p>
                      </div>
                      <div className="w-full px-2">
                        <p className="whitespace-nowrap">{request_path}</p>
                      </div>
                    </div>
                  )
                )}
              </main>
            ) : (
              <main className="flex items-center justify-center">
                <figure className="w-[250px]">
                  <img
                    src={NoData}
                    alt="empty logs illustration"
                    className="w-full h-full object-contain"
                  />
                </figure>
              </main>
            )}
          </div>
        </section>
      </Container>
      {!currentUser?.meta?.developer_enabled && <AgreementModal />}
    </>
  );
}
