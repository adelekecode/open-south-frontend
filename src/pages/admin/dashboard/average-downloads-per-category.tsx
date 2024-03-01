import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  Title,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartWrapper from "~/components/chart-wrapper";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AverageDownloadsPerCategory() {
  const labels = [
    "Economy",
    "Environment",
    "Health",
    "Culture and History",
    "Energy",
    "Infrastructure",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Day",
        data: [5, 23, 345, 566],
        backgroundColor: "#00a4ff",
      },
      {
        label: "Week",
        data: [1, 23, 135, 500],
        backgroundColor: "#ffa500e6",
      },
      {
        label: "Month",
        data: [1, 23, 205, 456],
        backgroundColor: "#008000eb",
      },
    ],
  };

  return (
    <ChartWrapper title="Average Download per Category Across Different Time Frames">
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
          },
        }}
        data={data}
      />
    </ChartWrapper>
  );
}
