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
  const { data } = useAverageViewPerCategory();

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
    <ChartWrapper title="Average views per category">
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
        data={{
          labels,
          datasets: [
            {
              label: "Day",
              data: values.day,
              backgroundColor: "#008000eb",
              borderColor: "#008000eb",
            },
            {
              label: "Week",
              data: values.week,
              backgroundColor: "#ffa500e6",
              borderColor: "#ffa500e6",
            },
            {
              label: "Month",
              data: values.month,
              backgroundColor: "#00a4ff",
              borderColor: "#00a4ff",
            },
          ],
        }}
      />
    </ChartWrapper>
  );
});
