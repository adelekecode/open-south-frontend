import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { IoArrowBack } from "react-icons/io5";
import Button from "~/components/button";
import NotFoundIllustration from "~/assets/illustrations/404.png";

export default function NotFound() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/user/me/"]);

  return (
    <div className="w-full flex flex-col flex-grow items-center justify-center gap-2 p-8">
      <figure className="w-[28%] tablet:w-[55%] largeMobile:!w-[70%]">
        <img src={NotFoundIllustration} alt="Not found Illustration" />
      </figure>
      <p className="mt-3 mb-2 text-center largeMobile:text-sm">
        We couldn't find what you are looking for. Let's find a better place for you to go.
      </p>
      <div className="flex items-center gap-8 mt-4">
        <Button
          variant="outlined"
          onClick={() => {
            navigate(currentUser?.role === "admin" ? "/admin/dashboard" : "/account/dashboard");
          }}
        >
          Go to Dashboard
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          startIcon={<IoArrowBack className="!fill-white largeMobile:!w-4" />}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
