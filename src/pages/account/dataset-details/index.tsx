import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import Button from "~/components/button";
import Resources from "./resources";
import DeleteConfirmation from "./delete-confirmation";

export default function DatasetDetails() {
  const navigate = useNavigate();

  const [displayDeleteConfirmationModal, setDisplayDeleteConfirmationModal] = useState(false);

  const data = {
    title: "Wildlife Conservation in Nairobi, Kenya",
    organization: null,
    user: {
      firstName: "Linda",
      lastName: "Omondi",
      image: "https://static.data.gouv.fr/avatars/cd/6d9c448556476ca76e8c4fcf0221a3-100.jpg",
    },
    description:
      "Dataset highlighting wildlife conservation efforts in Nairobi, Kenya. The data includes information on endangered species, conservation projects, and the impact of human activities on local ecosystems.",
    slug: "wildlife-conservation-nairobi-kenya",
    updatedAt: "2023-11-18T17:30:00+0100",
  };

  const breadcrumbs = [
    <Link key="1" to="/account/datasets" className="hover:underline">
      Datasets
    </Link>,
    <p key="2">{data.title}</p>,
  ];

  return (
    <>
      <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-8 w-full">
        <header className="flex items-center gap-8 justify-between w-full">
          <Breadcrumbs className="[&_p]:text-xs [&_p]:font-medium [&_a]:text-xs [&_a]:font-medium">
            {breadcrumbs}
          </Breadcrumbs>
          <div className="flex items-center gap-6">
            <Button
              variant="outlined"
              className="!py-2"
              onClick={() => {
                navigate("./edit");
              }}
            >
              Edit
            </Button>
            <Button
              color="error"
              className="!py-2"
              variant="outlined"
              onClick={() => {
                setDisplayDeleteConfirmationModal(true);
              }}
            >
              Delete
            </Button>
          </div>
        </header>
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p>{data.description}</p>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="flex items-center flex-wrap gap-4">
              {[1, 2, 3].map((_, index) => (
                <p
                  key={index + 1}
                  className="px-4 py-1 rounded-full bg-primary-100 text-sm text-primary-700 capitalize"
                >
                  map
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
            <div>
              <h3>License</h3>
              <p>{"Licence Ouverte / Open Licence version 2.0"}</p>
            </div>
          </div>
          <div className="flex gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
            <div>
              <h3>Creation</h3>
              <p>{"August 24, 2018"}</p>
            </div>
            <div>
              <h3>Update Frequency</h3>
              <p>{"Monthly"}</p>
            </div>
            <div>
              <h3>Latest update</h3>
              <p>{"December 1, 2023"}</p>
            </div>
          </div>
          <div className="flex flex-col gap-12 flex-wrap [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>h3]:text-sm [&>div>h3]:font-medium">
            <div>
              <h3>Temporal coverage</h3>
              <p className="[&>span]:font-medium [&>span]:capitalize">
                From <span>{"August 24, 2018"}</span> to <span>{"June 10, 2021"}</span>
              </p>
            </div>
          </div>
        </div>
        <Resources />
      </main>
      <DeleteConfirmation
        open={displayDeleteConfirmationModal}
        setOpen={(bool: boolean) => setDisplayDeleteConfirmationModal(bool)}
      />
    </>
  );
}
