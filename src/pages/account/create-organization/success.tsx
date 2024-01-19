import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SuccessIllustration from "~/assets/illustrations/success.png";
import Button from "~/components/button";

export default function Success() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const orgData = queryClient.getQueryData<Organization>(["create-org"]);

  return (
    <div className="p-4 py-8 flex flex-col items-center gap-4">
      <div className="p-6 pt-4 w-full flex flex-col items-center gap-4">
        <figure className="max-w-[9rem]">
          <img src={SuccessIllustration} alt="Success illustrion" />
        </figure>
        <p className="text-sm text-center">You have successfully created an organization</p>
      </div>
      <div className="w-full flex justify-center largeMobile:gap-4 largeMobile:items-center max-w-[500px]">
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/account/${orgData?.slug}/dashboard`);
          }}
          className="w-fit !py-2 !text-xs"
        >
          Go to organization dashboard
        </Button>
      </div>
    </div>
  );
}
