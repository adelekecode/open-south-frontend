import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Button from "~/components/button";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-700 w-full">
      <div className="w-full max-w-maxAppWidth p-4 py-12 mx-auto grid grid-cols-2 gap-4 tablet:flex tablet:flex-col tablet:gap-8">
        <div className="flex gap-3">
          <span className="w-1 bg-white rounded-full"></span>
          <div className="flex flex-col gap-6 py-4">
            <h1 className="text-3xl font-semibold text-white mediumMobile:text-2xl">Contribute</h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <IoChevronBack className="text-white rotate-180 text-sm" />
                <p className="text-white font-medium text-base mediumMobile:text-sm">
                  Create or find a dataset
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-between tablet:justify-end pr-[18%] gap-4 tablet:pr-0">
          <Button
            variant="outlined"
            color="inherit"
            className="!rounded-full !gap-3 mediumMobile:!p-2 mediumMobile:!px-5 !text-white"
            onClick={() => {
              navigate("/account/datasets/new");
            }}
          >
            <p className="text-white">Publish a dataset</p>
            <IoChevronBack className="text-white rotate-180 text-base" />
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            className="!rounded-full !gap-3 mediumMobile:!p-2 mediumMobile:!px-5 !text-white"
            onClick={() => {
              navigate("/datasets");
            }}
          >
            <p className="text-white">Find a dataset</p>
            <IoChevronBack className="text-white rotate-180 text-base" />
          </Button>
        </div>
      </div>
    </div>
  );
}
