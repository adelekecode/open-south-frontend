import { useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartWrapper from "~/components/chart-wrapper";

ChartJS.register(ArcElement, Tooltip, Legend);

const apiData = [
  {
    label: "Economy",
    value: 12,
  },
  {
    label: "Environment",
    value: 19,
  },
  {
    label: "Health",
    value: 3,
  },
  {
    label: "Culture and History",
    value: 5,
  },
  {
    label: "Energy",
    value: 2,
  },
];

const color = ["#00a4ff", "#ffa500e6", "#008000eb", "#ab2fab", "#a73d3d"];

export default function MostAccessedDatasets() {
  const [filteredLabels, setFilteredLabels] = useState<string[]>([]);
  const [filteredValues, setFilteredValues] = useState<number[]>([]);

  const { values, labels } = useMemo(() => {
    return apiData.reduce<{ labels: string[]; values: number[] }>(
      (acc, item) => {
        acc.labels.push(item.label);
        acc.values.push(item.value);

        return acc;
      },
      { labels: [], values: [] }
    );
    // }, [apiData]);
  }, []);

  return (
    <ChartWrapper title="Top 5 Most Accessed Datasets">
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

                const obj = apiData.find((item) => item.label === val);

                if (!obj) return;

                setFilteredValues((prev) =>
                  prev.includes(obj.value)
                    ? prev.filter((item) => item !== obj.value)
                    : [...prev, obj.value]
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
    </ChartWrapper>
  );
}
