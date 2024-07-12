import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import Button from "~/components/button";
import { useOrganizationRequestAction } from "~/mutations/organization";

type RequestProps = {
  data: OrganizationRequest["user_data"] & { userId: string; id: string };
};

export default function Request({
  data: { userId, id, first_name, last_name, image_url },
}: RequestProps) {
  const { orgId } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [choice, setChoice] = useState<"grant" | "deny" | null>(null);

  const { mutateAsync: organizationRequestAction, isLoading } = useOrganizationRequestAction(
    orgId || "",
    searchParams
  );

  return (
    <div
      className="w-full flex items-center gap-4 justify-between cursor-pointer hover:bg-info-50 transition p-4 py-2"
      onClick={() => {
        navigate(`/users/${userId}`);
      }}
    >
      <div className="flex items-center gap-2">
        <Avatar sx={{ width: 30, height: 30 }}>
          <img
            className="w-full h-full object-contain"
            src={image_url || ""}
            alt="organization or profile photo"
          />
        </Avatar>
        <p className="capitalize text-sm">
          <span>{first_name || "----"}</span> <span>{last_name || "----"}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="!text-xs !py-2 !px-3"
          color="success"
          variant="outlined"
          onClick={async (e) => {
            e.stopPropagation();
            setChoice("grant");

            await organizationRequestAction({
              id,
              actions: "approve",
            });
          }}
          disabled={isLoading}
          loading={choice === "grant" && isLoading}
        >
          Grant
        </Button>
        <Button
          className="!text-xs !py-2 !px-3"
          color="error"
          variant="outlined"
          loading={choice === "deny" && isLoading}
          onClick={async (e) => {
            e.stopPropagation();
            setChoice("deny");

            await organizationRequestAction({
              id,
              actions: "reject",
            });
          }}
          disabled={isLoading}
        >
          Deny
        </Button>
      </div>
    </div>
  );
}
