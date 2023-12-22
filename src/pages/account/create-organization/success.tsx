import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SuccessIllustration from "~/assets/illustrations/success.png";
import Button from "~/components/button";

export default function Success() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const organization = queryClient.getQueryData<{ slug: string; name: string; logo: string }>([
    "create-org",
  ]);

  return (
    <div className="p-4 py-4 flex flex-col items-center gap-2 w-full max-w-lg mx-auto">
      <div className="p-6 pt-4 w-full flex flex-col items-center gap-4">
        <figure className="max-w-[9rem]">
          <img src={SuccessIllustration} alt="Success illustrion" />
        </figure>
        <p className="text-sm">You have successfully created a dataset</p>
      </div>
      <Button
        onClick={() => {
          navigate(`/account/${organization?.slug}/dashboard`);
        }}
        className="w-fit !py-2"
      >
        View Organization
      </Button>
    </div>
  );
}
