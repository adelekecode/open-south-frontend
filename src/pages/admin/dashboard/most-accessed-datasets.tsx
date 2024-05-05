import { memo, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import ChartWrapper from "~/components/chart-wrapper";
import { useTopMostAccessedDatasets } from "~/queries/admin-dashboard";
import TopMostAccessedDatasets from "~/assets/illustrations/dashboard-chart/top-most-accessed-datasets.png";

ChartJS.register(ArcElement, Tooltip, Legend);

type Dataset = { id: string; value: number; label: string };

export default memo(function MostAccessedDatasets() {
  const { t } = useTranslation();

  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);

  const { data, isLoading } = useTopMostAccessedDatasets();

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter(
      (dataset) => !filteredDatasets.some((filteredDataset) => filteredDataset.id === dataset.id)
    );
  }, [data, filteredDatasets]);

  return (
    <ChartWrapper
      title={t("charts.most-accessed-datasets.title")}
      isLoading={isLoading}
      default={{
        data: !!data,
        img: {
          src: TopMostAccessedDatasets,
          alt: "Top most accessed datasets illustration",
        },
        text: t("charts.most-accessed-datasets.title"),
      }}
    >
      {data && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center flex-wrap gap-4">
            {data.map((item, index) => (
              <button
                key={index + 1}
                className="flex items-center gap-1"
                onClick={() => {
                  const isAlreadyFiltered = filteredDatasets.some(
                    (filteredDataset) => filteredDataset.id === item.id
                  );

                  if (isAlreadyFiltered) {
                    setFilteredDatasets((prev) =>
                      prev.filter((filteredDataset) => filteredDataset.id !== item.id)
                    );
                  } else {
                    setFilteredDatasets((prev) => [...prev, item]);
                  }
                }}
              >
                <span className="size-4" style={{ backgroundColor: item.color }} />
                <p
                  className={`text-xs font-medium text-info-900 ${filteredDatasets.find((filteredDataset) => filteredDataset.id === item.id) ? "line-through text-info-700" : ""}`}
                >
                  {item.label}
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
                labels: filteredData.map((dataset) => dataset.label),
                datasets: [
                  {
                    data: filteredData.map((dataset) => dataset.value),
                    backgroundColor: filteredData.map((dataset) => dataset.color),
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
