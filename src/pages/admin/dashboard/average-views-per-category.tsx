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
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import ChartWrapper from "~/components/chart-wrapper";
import { useAverageViewPerCategory } from "~/queries/admin-dashboard";

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

export default memo(function AverageViewsPerCategory() {
  const { t } = useTranslation();

  const { data, isLoading } = useAverageViewPerCategory();

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
              values.day.push(item.views);
            }
            break;
          case "weekly":
            for (const item of data[key]) {
              values.week.push(item.views);
            }
            break;
          case "monthly":
            for (const item of data[key]) {
              values.month.push(item.views);
            }
        }
      }
    }

    return { labels, values };
  }, [data]);

  return (
    <ChartWrapper title={t("charts.average-views-per-category")} isLoading={isLoading}>
      <Line
        className="!w-full"
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
              borderColor: "#008000cf",
            },
            {
              label: "Week",
              data: values.week,
              backgroundColor: "#ffa500cf",
              borderColor: "#ffa500cf",
            },
            {
              label: "Month",
              data: values.month,
              backgroundColor: "#00a4ffcf",
              borderColor: "#00a4ffcf",
            },
          ],
        }}
      />
    </ChartWrapper>
  );
});
