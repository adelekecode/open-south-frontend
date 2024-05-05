import { memo, useMemo } from "react";
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
import { useTranslation } from "react-i18next";
import ChartWrapper from "~/components/chart-wrapper";
import { useAverageDownloadPerCategory } from "~/queries/admin-dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default memo(function AverageDownloadsPerCategory() {
  const { t } = useTranslation();

  const { data, isLoading } = useAverageDownloadPerCategory();

  const { labels, values } = useMemo(() => {
    const labels: string[] = [];
    const values: Record<"day" | "week" | "month", number[]> = {
      day: [],
      week: [],
      month: [],
    };

    if (data) {
      for (const key in data) {
        switch (key) {
          case "daily":
            for (const item of data[key]) {
              labels.push(item.name);
              values.day.push(item.downloads);
            }
            break;
          case "weekly":
            for (const item of data[key]) {
              values.week.push(item.downloads);
            }
            break;
          case "monthly":
            for (const item of data[key]) {
              values.month.push(item.downloads);
            }
        }
      }
    }

    return { labels, values };
  }, [data]);

  return (
    <ChartWrapper title={t("average-download-per-Category")} isLoading={isLoading}>
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
          },
          scales: {
            y: {
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "Day",
              data: values.day,
              backgroundColor: "#008000cf",
            },
            {
              label: "Week",
              data: values.week,
              backgroundColor: "#ffa500cf",
            },
            {
              label: "Month",
              data: values.month,
              backgroundColor: "#00a4ffcf",
            },
          ],
        }}
      />
    </ChartWrapper>
  );
});
