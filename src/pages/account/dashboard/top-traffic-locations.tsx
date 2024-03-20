import { memo, useMemo } from "react";
import ChartWrapper from "~/components/chart-wrapper";
import { useTopTrafficLocations } from "~/queries/user-dashboard";
import TopTrafficLocationsIllustration from "~/assets/illustrations/dashboard-chart/top-traffic-locations.png";
import { calculatePercentage } from "~/utils/helper";
import { trafficLocationColors } from "~/app-constants";

export default memo(function TopTrafficLocations() {
  const { bgColors, borderColors } = trafficLocationColors;

  const { data, isLoading } = useTopTrafficLocations();

  const gridCols = useMemo(() => {
    if (data) {
      const gridCols: string[] = [];

      const topLocationCounts = data.top_locations.reduce(
        (total, location) => total + location.count,
        0
      );
      const totalCount = topLocationCounts + (data.others || 0);

      for (const { count } of data.top_locations) {
        gridCols.push(calculatePercentage(count, totalCount));
      }

      if (data.others) {
        gridCols.push(calculatePercentage(data.others, totalCount));
      }

      return `${gridCols.toString().replace(/,/g, " ")}`;
    }
  }, [data]);

  return (
    <ChartWrapper
      title="Top Traffic Locations"
      wrapperClassName="px-6 tablet:px-4 pb-6"
      isLoading={isLoading}
    >
      {data?.top_locations && data.top_locations.length >= 1 ? (
        <div className="w-full flex flex-col gap-4">
          <div
            className={`w-full mx-auto grid items-center overflow-hidden rounded-full h-3 tablet:h-2 [&>span]:h-full`}
            style={{
              gridTemplateColumns: gridCols,
            }}
          >
            {bgColors.slice(0, data.top_locations.length).map((color, index) => (
              <span className={`${color}`} key={index + 1} />
            ))}
            {data.others && <span className={`${bgColors.slice(-1)}`} />}
          </div>
          <div className="pl-4 tablet:pl-0 flex flex-col">
            {data.top_locations.map((item, index) => (
              <div key={index + 1} className="flex items-center gap-3">
                <span
                  className={`${borderColors[index]} size-4 tablet:size-3 border-2 rounded-full`}
                />{" "}
                <p className="text-base tablet:text-sm text-info-900">
                  <span>{item.country.charAt(0).toUpperCase() + item.country.slice(1)}</span>:{" "}
                  <span>{item.count}</span>
                </p>
              </div>
            ))}
            {data.others && (
              <div className="flex items-center gap-3">
                <span
                  className={`${borderColors.slice(-1)} size-4 tablet:size-3 border-2 rounded-full`}
                />{" "}
                <p className="text-base tablet:text-sm text-info-900">Other: {data.others}</p>
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
