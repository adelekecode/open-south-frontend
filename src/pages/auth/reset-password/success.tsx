import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Congratulation from "~/assets/gifs/congratulation.gif";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div
      className={`w-[85%] tabletAndBelow:w-[90%] tablet:!w-full flex flex-col gap-4 items-center p-8 pt-12 largeMobile:p-0`}
    >
      <header className="flex items-center flex-col">
        <h1 className="text-2xl font-semibold text-center largeMobile:text-xl">
          Password changed successfully
        </h1>
      </header>
      <div className="flex flex-col justify-center items-center w-full gap-10 mt-10">
        <img
          src={Congratulation}
          className="w-32 h-32 mx-auto mb-5"
          alt="Congratulation gif"
          width="250"
        />
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
