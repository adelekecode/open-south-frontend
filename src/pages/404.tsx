import { useNavigate } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import Button from "~/components/button";
import NotFoundIllustration from "~/assets/illustrations/404.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-2 p-8">
      {/* <h1 className=" text-4xl !font-semibold text-center tablet:text-3xl largeMobile:!text-2xl">
        Page not found
      </h1> */}
      <figure className="w-[28%] tablet:w-[55%] largeMobile:!w-[70%]">
        <img src={NotFoundIllustration} alt="Not found Illustration" />
      </figure>
      <p className="mt-3 mb-2 text-center largeMobile:text-sm">
        We couldn't find what you are looking for. Let's find a better place for you to go.
      </p>
      <div className="flex items-center gap-8 mt-4">
        <Button
          // variant="text"
          // color="primary"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Go to Dashboard
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          startIcon={<KeyboardBackspace className="!fill-white largeMobile:!w-4" />}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
