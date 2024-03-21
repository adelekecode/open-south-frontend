import ChartWrapper from "~/components/chart-wrapper";

export default function Performance() {
  return (
    <ChartWrapper
      title="Performance"
      wrapperClassName="bg-transparent border-none gap-6 mt-4 [@media(max-width:930px)]:order-6"
      titleWrapperClassName="justify-start"
    >
      <div>
        <p className="text-sm font-semibold text-info-700">
          <span className="text-green-500">(12%)</span> traffic since October
        </p>
        <h1 className="text-5xl font-semibold text-orange-500">26.8%</h1>
        <p className="font-bold text-info-700">DATA TRANSFER SAVED</p>
      </div>
    </ChartWrapper>
  );
}
