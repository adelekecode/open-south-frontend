import { DialogActions, DialogContent } from "@mui/material";
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
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogContent>
        <div className="bg-red-100 mb-3 w-fit rounded-md p-4 mx-auto">
          <BsDoorOpenFill className="text-red-400 p-2 !text-[3rem] !font-extralight" />
        </div>
        <h1 className="text-sm font-medium text-center">{t("contents")}</h1>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          loading={logout.isLoading}
          onClick={async () => {
            let token =
              localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);

            token = token ? JSON.parse(token) : undefined;

            if (!token) {
              return notifyError("Token not found in storage");
            }

            await logout.mutateAsync(token);
          }}
        >
          {t("cta-btn.yes")}
        </Button>
        <Button onClick={() => setOpen(false)} size="small">
          {t("cta-btn.no")}
        </Button>
      </DialogActions>
    </Modal>
  );
}
