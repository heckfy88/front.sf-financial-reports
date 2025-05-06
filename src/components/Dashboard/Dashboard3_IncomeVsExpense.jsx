import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard3({ transactions }) {
  let income = 0;
  let expense = 0;

  transactions.forEach(tx => {
    if (tx.category.type === "INCOME") {
      income += tx.amount;
    } else if (tx.category.type === "EXPENSE") {
      expense += tx.amount;
    }
  });

  const data = {
    labels: ["Поступления", "Траты"],
    datasets: [
      {
        label: "Сумма",
        data: [income, expense],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div>
      <h3>Сравнение поступлений и трат</h3>
      <Bar data={data} />
    </div>
  );
}

export default Dashboard3;
