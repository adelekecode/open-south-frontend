import { Bar } from "react-chartjs-2";
import ChartWrapper from "~/components/chart-wrapper";

export default function MostPublishedOrganizations() {
  const data = {
    labels: ["Economy", "Environment", "Health", "Culture and History", "Energy", "Infrastructure"],
    datasets: [
      {
        label: "Day",
        data: [5, 23, 345, 566, 449],
        backgroundColor: ["#00a4ff", "#ffa500e6", "#008000eb", "#ab2fab", "#a73d3d"],
      },
    ],
  };

  return (
    <ChartWrapper title="Top 5 Most Published Organizations">
      <Bar
        options={{
          responsive: true,

          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
            y: {
              type: "category",
              position: "left",

              // scaleOverride: true,
              // scaleSteps: 10,
              // scaleStartValue: 0,
              // scaleStepWidth: 1,
            },
          },
        }}
        data={data}
      />
    </ChartWrapper>
  );
}
