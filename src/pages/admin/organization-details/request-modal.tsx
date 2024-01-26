import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import { IoPerson } from "react-icons/io5";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useAdminOrganizationRequests } from "~/queries/organizations";
import NoData from "~/assets/illustrations/no-data.png";
import { useOrganizationRequestAction } from "~/mutations/organization";

type RequestModalProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

export default function RequestModal({ open, setOpen }: RequestModalProps) {
  const { id } = useParams();

  const { data, isLoading } = useAdminOrganizationRequests(id || "", {
    enabled: !!id,
  });

  const organizationRequestAction = useOrganizationRequestAction(id || "");

  return (
    <Modal
      muiModal={{
        open,
        onClose: () => setOpen(false),
      }}
      innerContainer={{
        className: "pt-[2rem]",
      }}
    >
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-xl font-semibold">Requests</h1>
        {isLoading ? (
          <div className="flex flex-col divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index + 1} className="w-full flex items-center gap-4 py-2">
                <div className="animate-pulse w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex items-center gap-2">
                  <div className="animate-pulse w-14 h-4 rounded-sm bg-gray-200" />
                  <div className="animate-pulse w-14 h-4 rounded-sm bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data.map((_, index) => (
              <div key={index + 1} className="w-full flex items-center gap-4 justify-between">
                <div className="flex items-center gap-2">
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <IoPerson className={"text-base"} />
                  </Avatar>
                  <p className="capitalize text-sm">
                    <span>{"John"}</span> <span>{"Doe"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    className="!text-xs !py-2 !px-3"
                    color="success"
                    variant="outlined"
                    onClick={async () => {
                      await organizationRequestAction.mutateAsync({
                        actions: "approve",
                      });
                    }}
                    loading={organizationRequestAction.isLoading}
                  >
                    Grant
                  </Button>
                  <Button
                    className="!text-xs !py-2 !px-3"
                    color="error"
                    variant="outlined"
                    loading={organizationRequestAction.isLoading}
                    onClick={async () => {
                      await organizationRequestAction.mutateAsync({
                        actions: "reject",
                      });
                    }}
                  >
                    Deny
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <figure className="w-[300px] largeMobile:w-[80%] aspect-square">
              <img src={NoData} className="object-cover w-full h-full" alt="no data illustration" />
            </figure>
          </div>
        )}
      </div>
    </Modal>
  );
}
