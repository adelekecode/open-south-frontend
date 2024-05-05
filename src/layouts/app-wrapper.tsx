import { Outlet } from "react-router-dom";
import LogoutModal from "~/components/logout-modal";
import SelectAvatarModal from "~/components/select-avatar-modal";

export default function AppWrapper() {
  return (
    <>
      <Outlet />
      <LogoutModal />
      <SelectAvatarModal />
    </>
  );
}
