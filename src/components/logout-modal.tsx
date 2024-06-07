import { useTranslation } from "react-i18next";
import { BsDoorOpenFill } from "react-icons/bs";
import { REFRESH_TOKEN_KEY } from "~/app-constants";
import useAppStore from "~/store/app";
import useLogout from "~/mutations/auth/logout";
import { notifyError } from "~/utils/toast";
import Button from "./button";
import Modal from "./modal";

export default function LogoutModal() {
  const { t } = useTranslation("components/logout-modal");

  const { setDisplayLogoutModal: setOpen, displayLogoutModal: open } = useAppStore();

  const logout = useLogout();

  return (
    <Modal
      muiModal={{
        open,
        onClose: () => {
          setOpen(false);
        },
      }}
    >
      <div className="flex flex-col gap-3 mediumMobile:gap-1">
        <span className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <BsDoorOpenFill className="text-red-400 p-2 !text-[4rem] mediumMobile:!text-[3rem] !font-extralight" />
        </span>
        <h1 className="text-xl tablet:text-lg largeMobile:!text-sm font-medium text-center">
          {t("contents")}
        </h1>
        <div className="mt-10 flex gap-6 justify-end">
          <Button
            variant="outlined"
            loading={logout.isLoading}
            onClick={async () => {
              let token =
                localStorage.getItem(REFRESH_TOKEN_KEY) ||
                sessionStorage.getItem(REFRESH_TOKEN_KEY);

              token = token ? JSON.parse(token) : undefined;

              if (!token) {
                return notifyError("Token not found in storage");
              }

              await logout.mutateAsync(token);
            }}
          >
            {t("cta-btn.yes")}
          </Button>
          <Button onClick={() => setOpen(false)}>{t("cta-btn.no")}</Button>
        </div>
      </div>
    </Modal>
  );
}
