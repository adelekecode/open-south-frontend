import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Button from "~/components/button";
import CurrentUserAvatar from "~/components/current-user-avatar";
import { useUserOrganizations } from "~/queries/organizations";
import useCreateDatasetStore from "~/store/create-dataset";

type PublishAsProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function PublishAs({ setActiveIndex }: PublishAsProps) {
  const navigate = useNavigate();

  const { organization, setOrganization } = useCreateDatasetStore();

  const { data: organizations, isLoading: isLoadingOrganizations } = useUserOrganizations();

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  return (
    <div className="pt-4 flex flex-col gap-10">
      <div className="px-4 flex flex-col gap-6">
        <h2 className="w-full text-center text-base font-semibold largeMobile:text-sm">
          Choose under which identity you want to publish
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium largeMobile:text-xs">Publish from your account</p>
            <div className="grid grid-cols-3 tablet:grid-cols-2 [@media(max-width:560px)]:grid-cols-1 gap-4">
              <button
                className={`border p-2 h-[7rem] rounded-sm flex items-start ${
                  !organization && "border-primary-600 bg-secondary-50"
                }`}
                onClick={() => {
                  setOrganization(null);
                }}
              >
                <div className="grid grid-cols-[50px,1fr] gap-4">
                  <CurrentUserAvatar
                    className="!w-full !h-[50px] !bg-white !border"
                    iconContainer={{
                      icon: {
                        className: "!text-info-700 !text-xl",
                      },
                    }}
                  />
                  <p className="text-start flex items-start gap-1 capitalize text-xs font-medium pt-2 flex-wrap">
                    <span>
                      {currentUser?.first_name ||
                        currentUser?.profile_data?.first_name ||
                        "-------"}
                    </span>{" "}
                    <span>
                      {currentUser?.last_name || currentUser?.profile_data?.last_name || "-------"}
                    </span>
                  </p>
                </div>
              </button>
            </div>
          </div>
          {isLoadingOrganizations ? (
            <div className="grid grid-cols-3 gap-4 tablet:grid-cols-2 [@media(max-width:560px)]:grid-cols-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index + 1} className="animate-pulse rounded-lg bg-gray-200 h-28" />
              ))}
            </div>
          ) : organizations && organizations.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium largeMobile:text-xs">
                Publish from an organization
              </p>
              <div className="grid grid-cols-3 tablet:grid-cols-2 [@media(max-width:560px)]:grid-cols-1 gap-4">
                {organizations.map((item, index) => {
                  const isActive = organization?.id === item.id;

                  return (
                    <button
                      className={`border p-2 h-[7rem] rounded-sm flex items-start ${
                        isActive && "border-primary-600 bg-secondary-50"
                      }`}
                      key={index + 1}
                      onClick={() => {
                        setOrganization(item);
                      }}
                    >
                      <div className="grid grid-cols-[50px,1fr] gap-4">
                        <figure className="w-full aspect-square p-1 border bg-white rounded-sm">
                          <img
                            src={item.logo}
                            alt="organization logo"
                            className="w-full h-full object-contain"
                          />
                        </figure>
                        <p className="font-medium !text-xs text-start pt-2">{item.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center flex-col justify-center gap-4 py-4">
              <p className="text-sm text-center largeMobile:text-xs">
                You are not a member of any organization. Maybe you should find yours or create your
                own.
              </p>
              <Button
                className="!py-3 !text-xs"
                onClick={() => {
                  navigate("/account/organizations/new");
                }}
              >
                Create your organization
              </Button>
            </div>
          )}
        </div>
      </div>
      <footer className="border-t p-4 py-2 flex items-center justify-end">
        <Button
          className="!py-2"
          onClick={() => {
            setActiveIndex((prev) => prev + 1);
          }}
        >
          Next
        </Button>
      </footer>
    </div>
  );
}
