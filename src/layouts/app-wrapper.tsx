import { Outlet } from "react-router-dom";
import LogoutModal from "~/components/logout-modal";
import SelectAvatarModal from "~/components/select-avatar-modal";
import useAppStore from "~/store/app";

export default function AppWrapper() {
  const { displaySelectAvatarModal } = useAppStore();

  return (
    <>
      <Outlet />
      <LogoutModal />
      {displaySelectAvatarModal && <SelectAvatarModal />}
    </>
  );
}
