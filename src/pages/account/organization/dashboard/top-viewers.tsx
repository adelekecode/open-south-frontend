import { BarChart } from "@mui/x-charts";

export default function TopViewers() {
  return (
    <div className="border p-4 flex flex-col gap-4 border-info-100 bg-white rounded-md">
      <h1 className="text-base text-info-700 font-medium">Top Viewers</h1>
      <BarChart
        sx={{
          width: "100%",
        }}
        height={250}
        xAxis={[{ scaleType: "band", data: ["Nigeria", "Canada", "Kenya"] }]}
        series={[{ data: [567, 399, 234], label: "Total views:", color: "#0e82bb" }]}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
    </div>
  );
}
