import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  Title,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function AverageViewsPerCategory() {
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
        data: [5, 23, 345, 566, 400, 30],
        backgroundColor: "#008000eb",
        borderColor: "#008000eb",
      },
      {
        label: "Week",
        data: [1, 50, 45, 300, 300, 20],
        backgroundColor: "#ffa500e6",
        borderColor: "#ffa500e6",
      },
      {
        label: "Month",
        data: [1, 100, 445, 277, 350, 50],
        backgroundColor: "#00a4ff",
        borderColor: "#00a4ff",
      },
    ],
  };

  return (
    <div className="w-full border border-info-100 bg-white p-4 rounded-md flex flex-col gap-4 py-5 pt-4">
      <div className="flex items-center justify-center">
        <h1 className="text-base font-semibold text-info-950 text-center [@media(max-width:1350px)]:text-sm">
          Average views per category
        </h1>
      </div>
      <div className="w-full">
        <Line
          className="!w-full"
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
    </div>
  );
}
