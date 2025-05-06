import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const groupByCategory = (transactions, type) => {
  const stats = {};
  transactions.forEach(tx => {
    if (tx.category.type === type) {
      const name = tx.category.description;
      stats[name] = (stats[name] || 0) + tx.amount;
    }
  });
  return stats;
};

function Dashboard6({ transactions }) {
  const incomeStats = groupByCategory(transactions, "INCOME");
  const expenseStats = groupByCategory(transactions, "EXPENSE");

  const incomeData = {
    labels: Object.keys(incomeStats),
    datasets: [
      {
        label: "Доходы",
        data: Object.values(incomeStats),
        backgroundColor: ["#4caf50", "#81c784", "#a5d6a7", "#388e3c"],
      },
    ],
  };

  const expenseData = {
    labels: Object.keys(expenseStats),
    datasets: [
      {
        label: "Расходы",
        data: Object.values(expenseStats),
        backgroundColor: ["#e57373", "#ef5350", "#f44336", "#c62828"],
      },
    ],
  };

  return (
    <div>
      <h3>Категории доходов</h3>
      <Pie data={incomeData} />
      <h3>Категории расходов</h3>
      <Pie data={expenseData} />
    </div>
  );
}

export default Dashboard6;
