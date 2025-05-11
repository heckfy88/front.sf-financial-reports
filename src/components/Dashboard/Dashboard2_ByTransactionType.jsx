import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const groupByType = (transactions, period = "month") => {
  const grouped = {};

  transactions.forEach(tx => {
    const date = new Date(tx.date);
    const periodKey =
      period === "month"
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        : period === "quarter"
          ? `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`
          : `${date.getFullYear()}`;

    const type = tx.category.type;

    if (!grouped[periodKey]) grouped[periodKey] = { INCOME: 0, EXPENSE: 0 };
    grouped[periodKey][type] += 1;
  });

  return grouped;
};

function Dashboard2({ transactions }) {
  const grouped = groupByType(transactions);
  const labels = Object.keys(grouped).sort();
  const incomeData = labels.map(label => grouped[label].INCOME || 0);
  const expenseData = labels.map(label => grouped[label].EXPENSE || 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Кредит (INCOME)",
        data: incomeData,
        borderColor: "green",
        tension: 0.2,
      },
      {
        label: "Дебет (EXPENSE)",
        data: expenseData,
        borderColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <div>
      <h3>Динамика по типу транзакции</h3>
      <Line data={data} />
    </div>
  );
}

export default Dashboard2;
