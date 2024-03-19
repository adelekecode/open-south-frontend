import { memo } from "react";
import ChartWrapper from "~/components/chart-wrapper";
import { useTopTrafficLocations } from "~/queries/user-dashboard";
import TopTrafficLocationsIllustration from "~/assets/illustrations/dashboard-chart/top-traffic-locations.png";

const bgColors = [
  "bg-[#00a4ff]",
  "bg-[#ffa500e6]",
  "bg-[#008000eb]",
  "bg-[#ab2fab]",
  "bg-[#a73d3d]",
];
const borderColors = [
  "border-[#ffa500e6]",
  "border-[#008000eb]",
  "border-[#ab2fab]",
  "border-[#a73d3d]",
];

export default memo(function TopTrafficLocations() {
  const { data } = useTopTrafficLocations();

  return (
    <ChartWrapper title="Top Traffic Locations" wrapperClassName="px-6 largeMobile:px-4 pb-6">
      {data?.top_locations && data.top_locations.length >= 1 ? (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full mx-auto grid grid-cols-[40%,10%,20%,20%,10%] items-center overflow-hidden rounded-full h-3 largeMobile:h-2 [&>span]:h-full">
            {bgColors.map((color, index) => (
              <span className={`${color}`} key={index + 1} />
            ))}
          </div>
          <div className="pl-4 largeMobile:pl-0 flex flex-col">
            {data.top_locations.map((item, index) => (
              <div key={index + 1} className="flex items-center gap-3">
                <span
                  className={`${borderColors[index]} size-4 largeMobile:size-3 border-2 rounded-full`}
                />{" "}
                <p className="text-base largeMobile:text-sm text-info-900">
                  {item.country}: {item.count}
                </p>
              </div>
            ))}
            {data.others && (
              <div className="flex items-center gap-3">
                <span
                  className={`${borderColors[-1]} size-4 largeMobile:size-3 border-2 rounded-full`}
                />{" "}
                <p className="text-base largeMobile:text-sm text-info-900">Other: {data.others}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-56 flex-col">
          <figure className="w-[200px]">
            <img
              src={TopTrafficLocationsIllustration}
              alt="Top traffic locations illustration"
              className="w-full h-full object-cover"
            />
          </figure>
          <p className="text-info-600 text-sm">No traffic data available at the moment</p>
        </div>
      )}
    </ChartWrapper>
  );
});
