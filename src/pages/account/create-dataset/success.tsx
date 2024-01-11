import { useNavigate } from "react-router-dom";
import SuccessIllustration from "~/assets/illustrations/success.png";
import Button from "~/components/button";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="p-4 py-8 flex flex-col items-center gap-4">
      <div className="p-6 pt-4 w-full flex flex-col items-center gap-4">
        <figure className="max-w-[9rem]">
          <img src={SuccessIllustration} alt="Success illustrion" />
        </figure>
        <p className="text-sm text-center">You have successfully created a dataset</p>
      </div>
      <div className="w-full flex justify-between largeMobile:flex-col-reverse largeMobile:gap-4 largeMobile:items-center max-w-[500px]">
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/account/dashboard");
          }}
          className="w-fit !py-2 !text-xs"
        >
          Go to dashboard
        </Button>
        <Button
          onClick={() => {
            navigate("/account/datasets/");
          }}
          className="w-fit !py-2 !text-xs"
        >
          View Dataset
        </Button>
      </div>
    </div>
  );
}
