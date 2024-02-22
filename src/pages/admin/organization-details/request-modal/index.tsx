import { useParams } from "react-router-dom";
import Modal from "~/components/modal";
import { useAdminOrganizationRequests } from "~/queries/organizations";
import NoData from "~/assets/illustrations/no-data.png";
import Request from "./request";

type RequestModalProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
  pagination: Pagination;
};

export default function RequestModal({ open, setOpen, pagination }: RequestModalProps) {
  const { id } = useParams();

  const { data, isLoading } = useAdminOrganizationRequests(id || "", {
    enabled: !!id,
  });

  function onClose() {
    setOpen(false);
  }

  return (
    <Modal
      muiModal={{
        open,
        onClose,
      }}
      innerContainer={{
        className: "pt-[2rem] min-h-[60%]",
      }}
    >
      <div className="flex flex-col gap-4 w-full">
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
          <div className="flex flex-col divide-y">
            {data.map((item, index) => (
              <Request
                data={{
                  ...item.user_data,
                  id: item.id,
                  userId: item.user,
                }}
                key={index + 1}
                pagination={pagination}
              />
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
