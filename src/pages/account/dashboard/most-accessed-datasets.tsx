import { memo, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartWrapper from "~/components/chart-wrapper";
import { useTopMostAccessedDatasets } from "~/queries/user-dashboard";
import TopMostAccessedDatasets from "~/assets/illustrations/dashboard-chart/top-most-accessed-datasets.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const color = ["#00a4ff", "#ffa500e6", "#008000eb", "#ab2fab", "#a73d3d"];

//? fix: filter

export default memo(function MostAccessedDatasets() {
  const [filteredLabels, setFilteredLabels] = useState<string[]>([]);
  const [filteredValues, setFilteredValues] = useState<number[]>([]);

  const { data, isLoading } = useTopMostAccessedDatasets();

  const { values, labels } = useMemo(() => {
    const labels: string[] = [];
    const values: number[] = [];

    if (data) {
      for (const { title, views } of data) {
        labels.push(title);
        values.push(views);
      }
    }

    return { values, labels };
  }, [data]);

  return (
    <ChartWrapper
      title="Top 5 Most Accessed Datasets"
      isLoading={isLoading}
      default={{
        data: !!data,
        img: {
          src: TopMostAccessedDatasets,
          alt: "Top most accessed datasets illustration",
        },
        text: "No accessed datasets at the moment",
      }}
    >
      {data && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center flex-wrap gap-4">
            {labels.map((val, index) => (
              <button
                key={index + 1}
                className="flex items-center gap-1"
                onClick={() => {
                  setFilteredLabels((prev) =>
                    prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
                  );

                  const obj = data.find((item) => item.title === val);

                  if (!obj) return;

                  setFilteredValues((prev) =>
                    prev.includes(obj.views)
                      ? prev.filter((item) => item !== obj.views)
                      : [...prev, obj.views]
                  );
                }}
              >
                <span className="size-4" style={{ backgroundColor: color[index] }} />
                <p
                  className={`text-xs font-medium text-info-900 ${filteredLabels.includes(val) && "line-through text-info-700"}`}
                >
                  {val}
                </p>
              </button>
            ))}
          </div>
          <div className="w-[45%] aspect-square mx-auto largeLaptop:p-4">
            <Doughnut
              className="!w-full"
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function ({ formattedValue, dataset }) {
                        const { data } = dataset;

                        const total = data.reduce((acc, val) => acc + val);

                        const result = (+formattedValue / total) * 100;

                        return `${Math.round(result)}%`;
                      },
                    },
                  },
                },
              }}
              data={{
                labels: labels.filter((val) => !filteredLabels.includes(val)),
                datasets: [
                  {
                    data: values.filter((val) => !filteredValues.includes(val)),
                    backgroundColor: color,
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
    </ChartWrapper>
  );
});
