import { Drawer, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import SidebarLinks from "./sidebar-links";
import { useCurrentUser } from "~/queries/user";
import CurrentUserAvatar from "~/components/current-user-avatar";
import Button from "~/components/button";
import useAppStore from "~/store/app";

type Props = {
  open: boolean;
  closeDrawer: () => void;
};

export default function MobileSidebar({ open, closeDrawer }: Props) {
  const { setDisplayLogoutModal } = useAppStore();

  const { data: currentUser } = useCurrentUser(undefined, {
    enabled: false,
  });

  return (
    <Drawer open={open} onClose={closeDrawer}>
      <aside className="laptopAndAbove:hidden w-[350px] largeMobile:w-[290px] mediumMobile:!w-[250px] relative pt-20 px-4 flex flex-col items-center gap-8 justify-between h-full">
        <IconButton className="w-fit !absolute !top-[16px] !right-[16px]" onClick={closeDrawer}>
          <IoClose className="text-zinc-800" />
        </IconButton>
        <div className="w-full flex flex-col h-full justify-between overflow-auto gap-4">
          <SidebarLinks wrapperClassName="overflow-visible" />
          <div className="hidden tablet:flex tablet:gap-6 tablet:flex-col pb-6">
            <div className="flex items-center gap-2">
              <CurrentUserAvatar
                className="!border !p-1"
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
              <p className="text-sm flex items-center gap-1 capitalize">
                <span>
                  {currentUser?.first_name || currentUser?.profile_data?.first_name || "-------"}
                </span>
                <span>
                  {currentUser?.last_name || currentUser?.profile_data?.last_name || "-------"}
                </span>
              </p>
            </div>
            <div className="px-4 w-full">
              <Button
                variant="outlined"
                className="!w-full"
                onClick={() => setDisplayLogoutModal(true)}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </Drawer>
  );
}
