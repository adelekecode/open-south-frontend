import ChartWrapper from "~/components/chart-wrapper";

export default function TopTrafficLocations() {
  const colors = [
    "bg-[#00a4ff]",
    "bg-[#ffa500e6]",
    "bg-[#008000eb]",
    "bg-[#ab2fab]",
    "bg-[#a73d3d]",
  ];

  return (
    <ChartWrapper title="Top Traffic Locations" wrapperClassName="px-6 pb-6">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full mx-auto grid grid-cols-[40%,10%,20%,20%,10%] items-center overflow-hidden rounded-full h-3 [&>span]:h-full">
          {colors.map((color, index) => (
            <span className={`${color}`} key={index + 1} />
          ))}
        </div>
        <div className="pl-4 flex flex-col [&>div]:flex [&>div]:items-center [&>div]:gap-3 [&>div>span]:border-2 [&>div>span]:rounded-full [&>div>p]:text-base [&>div>p]:text-info-900">
          <div>
            <span className={`border-[#00a4ff] size-4`} />
            <p>Nigeria: 2,030</p>
          </div>
          <div>
            <span className={`border-[#ffa500e6] size-4`} /> <p>Kenya: 696</p>
          </div>
          <div>
            <span className={`border-[#008000eb] size-4`} /> <p>Germany: 209</p>
          </div>
          <div>
            <span className={`border-[#ab2fab] size-4`} /> <p>Ireland: 44</p>
          </div>
          <div>
            <span className={`border-[#a73d3d] size-4`} /> <p>Other: 210</p>
          </div>
        </div>
      </div>
    </ChartWrapper>
  );
}
