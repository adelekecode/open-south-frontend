import { Outlet } from "react-router-dom";
import NotFound from "~/pages/404";
import { useCurrentUser } from "~/queries/user";
import ForbiddenIllustration from "~/assets/illustrations/403.png";

export default function DeveloperPermission() {
  const { data: currentUser } = useCurrentUser(undefined, {
    enabled: false,
  });

  if (!currentUser) {
    return <NotFound />;
  }

  if (currentUser.meta?.developer_enabled && !currentUser.api_?.is_active) {
    return (
      <div className="w-full flex flex-col flex-grow items-center justify-center gap-2 p-8 largeMobile:px-6">
        <figure className="w-[28%] tablet:w-[55%] largeMobile:!w-[70%]">
          <img src={ForbiddenIllustration} alt="Forbidden Illustration" />
        </figure>
        <p className="mt-3 mb-2 text-sm mediumMobile:!text-xs max-w-[500px] text-center">
          Your access has been revoked. Please reach out to our support team at{" "}
          <a
            className="underline text-primary-600 text-center whitespace-nowrap"
            href={`mailto:support@opensouth.io`}
          >
            support@opensouth.io
          </a>{" "}
          to restore your access.
        </p>
      </div>
    );
  }

  return <Outlet />;
}
