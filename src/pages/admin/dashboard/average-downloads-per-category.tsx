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
    <div className="w-full border border-info-100 bg-white p-4 rounded-md flex flex-col gap-4 py-5 pt-4">
      <div className="flex items-center justify-center">
        <h1 className="text-base font-semibold text-info-950 text-center [@media(max-width:1350px)]:text-sm">
          Average Download per Category Across Different Time Frames
        </h1>
      </div>
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
    </div>
  );
}
