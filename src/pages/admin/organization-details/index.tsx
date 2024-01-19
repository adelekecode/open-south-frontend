import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UserTable from "./user-table";
import Button from "~/components/button";
import RequestModal from "./request-modal";

export default function OrganizationDetails() {
  const { id } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const [displayRequestModal, setDisplayRequestModal] = useState(false);

  const data = { id, name: "Netflix", description: "A very long description..." } as Organization;

  useEffect(() => {
    if (!descriptionRef.current) return;
    if (data?.description) {
      descriptionRef.current.innerHTML = data.description;
    } else {
      descriptionRef.current.innerHTML = "";
    }
  }, [data?.description]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium flex items-center gap-2">
            Dashboard <span className="text-sm">{">"}</span>{" "}
            <span className="text-info-800">{data?.name || "-----"}</span>
          </h1>
          <Button
            className="!py-2 !px-3 !text-xs"
            variant="outlined"
            onClick={() => {
              setDisplayRequestModal(true);
            }}
          >
            View Requests
          </Button>
        </div>
        <div className="bg-white w-full border border-info-100 rounded-md flex flex-col gap-6 p-6">
          <header className="flex flex-col gap-4">
            <figure className="w-[7rem] h-[7rem] border p-2 bg-white">
              <img
                src={data.logo || ""}
                alt="organization logo"
                className="w-full h-full object-contain"
              />
            </figure>
            <h1 className="text-xl font-semibold">{data.name || "----------"}</h1>
          </header>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xs text-info-950">Description</h2>
              <p className="text-sm" ref={descriptionRef}></p>
            </div>
            <UserTable />
            <div className="flex flex-col gap-3"></div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xs text-info-950">General Statistics</h2>
              <div className="flex items-start gap-16 [&>div]:flex [&>div]:flex-col [&>div>p]:text-sm [&>div>p]:font-medium [&>div>h3]:text-xl [&>div>h3]:font-bold">
                <div>
                  <p>Datasets</p>
                  <h3>317</h3>
                </div>
                <div>
                  <p>Views</p>
                  <h3>4.3M</h3>
                </div>
                <div>
                  <p>Downloads</p>
                  <h3>1.2M</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xs text-info-950">Technical Details</h2>
              <div className="grid gap-8 grid-cols-3 tabletAndBelow:grid-cols-2 tablet:!grid-cols-1 [&>div]:flex [&>div]:flex-col [&>div>h3]:font-semibold [&>div>h3]:text-sm">
                <div>
                  <h3>Latest dataset update</h3>
                  <p>November 29, 2023</p>
                </div>
                <div>
                  <h3>Organization creation date</h3>
                  <p>April 17, 2014</p>
                </div>
                <div>
                  <h3>ID</h3>
                  <p>534fff94a3a7292c64a77fc1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <RequestModal
        setOpen={(bool: boolean) => setDisplayRequestModal(bool)}
        open={displayRequestModal}
      />
    </>
  );
}
