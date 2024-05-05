import { memo, useMemo } from "react";
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
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import ChartWrapper from "~/components/chart-wrapper";
import { useMostPublishedOrganizations } from "~/queries/admin-dashboard";

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

export default memo(function MostPublishedOrganizations() {
  const { t } = useTranslation("dashboard-layout/admin/dashboard");

  const { data, isLoading } = useMostPublishedOrganizations();

  const { labels, values } = useMemo(() => {
    const labels: string[] = [];
    const values: number[] = [];

    if (data) {
      for (const { name, data_count } of data) {
        labels.push(name.charAt(0).toUpperCase() + name.slice(1));
        values.push(data_count);
      }
    }

    return { labels, values };
  }, [data]);

  return (
    <ChartWrapper title={t("charts.most-published-organizations")} isLoading={isLoading}>
      <Bar
        options={{
          responsive: true,
          indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              ticks: {
                stepSize: 1,
              },
            },
            y: {
              type: "category",
              position: "left",
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "Day",
              data: values,
              backgroundColor: ["#00a4ffcf", "#ffa500cf", "#008000cf", "#ab2fabcf", "#d64794cf"],
            },
          ],
        }}
      />
    </ChartWrapper>
  );
});
