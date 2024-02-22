import { useNavigate } from "react-router-dom";
import SuccessIllustration from "~/assets/illustrations/success.png";
import Button from "~/components/button";

type SuccessProps = {
  data: Organization;
};

export default function Success({ data }: SuccessProps) {
  const navigate = useNavigate();

  return (
    <div className="p-4 py-4 flex flex-col items-center gap-2 w-full max-w-lg mx-auto">
      <div className="p-6 pt-4 w-full flex flex-col items-center gap-4">
        <figure className="max-w-[9rem]">
          <img src={SuccessIllustration} alt="Success illustrion" />
        </figure>
        <p className="text-sm">You have successfully updated {`${data.name}`}</p>
      </div>
      <Button
        onClick={() => {
          navigate(`/account/${data?.slug}/dashboard`);
        }}
        className="w-fit !py-2"
      >
        View Organization
      </Button>
    </div>
  );
}
