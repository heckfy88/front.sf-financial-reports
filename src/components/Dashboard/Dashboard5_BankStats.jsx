import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const countBanks = (transactions, key) => {
  const stats = {};
  transactions.forEach(tx => {
    const bank = tx[key];
    stats[bank] = (stats[bank] || 0) + 1;
  });
  return stats;
};

function Dashboard5({ transactions }) {
  const senderStats = countBanks(transactions, "senderBank");
  const receiverStats = countBanks(transactions, "receiverBank");

  const banks = Array.from(new Set([...Object.keys(senderStats), ...Object.keys(receiverStats)]));
  const senderData = banks.map(bank => senderStats[bank] || 0);
  const receiverData = banks.map(bank => receiverStats[bank] || 0);

  const data = {
    labels: banks,
    datasets: [
      {
        label: "Отправитель",
        data: senderData,
        backgroundColor: "#42a5f5",
      },
      {
        label: "Получатель",
        data: receiverData,
        backgroundColor: "#66bb6a",
      },
    ],
  };

  return (
    <div>
      <h3>Статистика по банкам</h3>
      <Bar data={data} />
    </div>
  );
}

export default Dashboard5;
