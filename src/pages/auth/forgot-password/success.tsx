import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Button from "~/components/button";

type SuccessProps = {
  email: string;
};

export default function Success({ email }: SuccessProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-[85%] tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 pt-12 largeMobile:p-0`}
    >
      <header className="flex items-center flex-col">
        <h1 className="text-2xl font-semibold text-center largeMobile:text-xl">Check your mail</h1>
      </header>
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <p className="text-base mb-5 flex flex-col items-center">
          We sent a password reset link to <br />{" "}
          <span className="!text-primary-700 font-medium">{email}</span>
        </p>
        <Button
          type="submit"
          className="w-full"
          onClick={() => {
            window.location.href = "mailto:";
          }}
        >
          Open email app
        </Button>
        {/* <p className="mt-5 text-sm">
          Didin't receive the email?{" "}
          <button className="text-primary-700 font-semibold hover:underline cursor-pointer">
            Resend
          </button>
        </p> */}
        <button
          className="flex items-center cursor-pointer gap-2"
          onClick={() => {
            navigate("/login");
          }}
        >
          <IoArrowBack />
          <p className="text-sm">Back to login</p>
        </button>
      </div>
    </div>
  );
}
