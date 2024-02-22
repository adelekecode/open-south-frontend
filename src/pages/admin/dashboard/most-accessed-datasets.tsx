import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MostAccessedDatasets() {
  const labels = ["Economy", "Environment", "Health", "Culture and History", "Energy"];

  const data = {
    labels,
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: ["#00a4ff", "#ffa500e6", "#008000eb", "#ab2fab", "#a73d3d"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full border border-info-100 bg-white p-4 rounded-md flex flex-col gap-4 py-5 pt-4">
      <div className="flex items-center justify-center">
        <h1 className="text-base font-semibold text-info-950 text-center [@media(max-width:1350px)]:text-sm">
          Top 5 Most Accessed Datasets
        </h1>
      </div>
      <div className="w-[80%] aspect-square largePhones:w-[52%] mediumPhones:!w-[72%] mx-auto largeLaptop:p-4">
        <Doughnut
          className="!w-full"
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
                align: "start",
              },
              tooltip: {
                callbacks: {
                  label: function ({ formattedValue, dataset }) {
                    const { data } = dataset;

                    let total = 0;

                    for (let i = 0; i < data.length; i++) {
                      total += data[i];
                    }

                    const result = (+formattedValue / total) * 360;

                    return `${Math.round(result)}%`;
                  },
                },
              },
            },
          }}
          data={data}
        />
      </div>
    </div>
  );
}
