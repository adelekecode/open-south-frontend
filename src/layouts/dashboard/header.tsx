import { useQueryClient } from "@tanstack/react-query";
import CurrentUserAvatar from "~/components/current-user-avatar";

export default function Header() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  return (
    <nav className="bg-info-50 flex items-center justify-end tabletAndBelow:bg-white border-l-0 border-b border-info-300 tabletAndBelow:!border-b p-5 py-3 px-[3.5rem] tabletAndBelow:p-5 tabletAndBelow:py-4 sticky top-0 z-[99]">
      <button className="flex items-center gap-3">
        <CurrentUserAvatar />
        <p className="flex items-center gap-1 capitalize text-sm font-medium">
          <span>
            {currentUser?.first_name || currentUser?.profile_data?.first_name || "-------"}
          </span>{" "}
          <span>{currentUser?.last_name || currentUser?.profile_data?.last_name || "-------"}</span>
        </p>
      </button>
    </nav>
  );
}
