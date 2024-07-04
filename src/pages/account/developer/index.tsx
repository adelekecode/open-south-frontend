import { useTranslation } from "react-i18next";
import AgreementModal from "./agreement-modal";
import Button from "~/components/button";
import { notifySuccess } from "~/utils/toast";
import useAppStore from "~/store/app";
import { useGetAPIKey } from "~/queries/user";
import { useGenerateAPIKey } from "~/mutations/user";

export default function Developer() {
  const { t } = useTranslation("dashboard-layout/account/developer");

  const { developerUseAgreed } = useAppStore();

  const { data: apiKey } = useGetAPIKey({
    options: {
      enabled: !!developerUseAgreed,
    },
  });
  const { mutateAsync: generateAPIKey, isLoading } = useGenerateAPIKey();

  async function copyToClip() {
    const copyData = `${apiKey?.token}`;

    navigator.clipboard.writeText(copyData).then(() => {
      notifySuccess("API key copied");
    });
  }

  return (
    <>
      <main className="p-6 px-8 pb-12 tablet:px-6 largeMobile:!px-4 gap-4 flex flex-col">
        <header className="flex items-center gap-8 justify-between">
          <h1 className="text-2xl largeMobile:text-xl font-semibold">{t("title")}</h1>
          <Button variant="outlined" size="small">
            {t("go-to-docs")}
          </Button>
        </header>
        <div className="w-full border border-info-100 bg-white p-8 tablet:p-6 largeMobile:!p-4 rounded-md flex flex-col divide-y">
          <section className="flex flex-col gap-6 pb-8">
            <div className="flex flex-col gap-6 w-full">
              <header className="flex flex-col gap-1">
                <h3 className="font-semibold">API Key</h3>
                <small>The API key below is used to access datasets outside of our website.</small>
              </header>
              <div className="p-1 pl-4 rounded border flex items-center max-w-[80%] tablet:w-full tablet:max-w-[initial]">
                <p className="w-fit text-sm">
                  {developerUseAgreed ? apiKey?.token : "********************"}
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
              Generate New API Key
            </Button>
          </section>
          <section className="flex flex-col gap-6 pt-8">
            <header className="flex flex-col gap-1">
              <h3 className="font-semibold">API Logger</h3>
              <small>
                The logger will help you see the requests you are making and the time they were
                made.
              </small>
            </header>
            <div></div>
          </section>
        </div>
      </main>
      {!developerUseAgreed && <AgreementModal />}
    </>
  );
}
