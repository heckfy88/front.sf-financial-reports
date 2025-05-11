import React, { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { groupByTimeRange } from "_services/date.service.js";
import styles from "./styles.module.scss";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const rangeOptions = ["week", "month", "quarter", "year"];

function Dashboard1({ transactions }) {
  const [range, setRange] = useState("month");

  const groupedData = useMemo(() => {
    return groupByTimeRange(transactions, range);
  }, [transactions, range]);

  const sortedEntries = useMemo(() => Object.entries(groupedData).sort(([a], [b]) =>
    a.localeCompare(b)
  ), [groupedData]);

  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Количество транзакций",
        data: sortedEntries.map(([, value]) => value),
        backgroundColor: "#007bff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Дата",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Количество",
        },
      },
    },
  };

  return (
    <div>
      <div className={styles.timeRangeSelector}>
        {rangeOptions.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={range === r ? styles.active : ""}
          >
            {r === "week"
              ? "Неделя"
              : r === "month"
                ? "Месяц"
                : r === "quarter"
                  ? "Квартал"
                  : "Год"}
          </button>
        ))}
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Dashboard1;
