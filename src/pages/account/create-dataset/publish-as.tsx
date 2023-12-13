import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "~/components/button";
import OrgData from "~/utils/data/organization.json";
import CurrentUserAvatar from "~/components/current-user-avatar";

type PublishAsProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function PublishAs({ setActiveIndex }: PublishAsProps) {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  return (
    <div className="pt-4 flex flex-col gap-10">
      <div className="px-4 flex flex-col gap-6">
        <h2 className="w-full text-center text-base font-semibold">
          Choose under which identity you want to publish
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Publish from your account</p>
            <div className="grid grid-cols-3 gap-4">
              <button
                className={`border p-2 h-[7rem] rounded-sm flex items-start ${
                  !selectedOrg && "border-primary-600 bg-secondary-50"
                }`}
                onClick={() => {
                  setSelectedOrg(null);
                }}
              >
                <div className="grid grid-cols-[50px,1fr] gap-4">
                  {/* <figure className="w-full aspect-square p-1 border bg-white rounded-sm">
                    <img
                      src={currentUser?.image || ""}
                      alt="company logo"
                      className="w-full h-full object-contain"
                    />
                  </figure> */}
                  <CurrentUserAvatar />
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
          {OrgData.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Publish from an organization</p>
              <div className="grid grid-cols-3 gap-4">
                {OrgData.map((item, index) => {
                  const isActive = selectedOrg === item.id;

                  return (
                    <button
                      className={`border p-2 h-[7rem] rounded-sm flex items-start ${
                        isActive && "border-primary-600 bg-secondary-50"
                      }`}
                      key={index + 1}
                      onClick={() => {
                        setSelectedOrg(item.id);
                      }}
                    >
                      <div className="grid grid-cols-[50px,1fr] gap-4">
                        <figure className="w-full aspect-square p-1 border bg-white rounded-sm">
                          <img
                            src={item.image}
                            alt="company logo"
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
            <div>
              <p>
                You are not a member of any organization. Maybe you should find yours or create your
                own.
              </p>
              <Button>Create your organization</Button>
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
