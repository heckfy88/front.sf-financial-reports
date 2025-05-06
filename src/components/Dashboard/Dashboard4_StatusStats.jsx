import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TRANSACTION_STATUS_TYPES } from "_services/transactions.service.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard4({ transactions }) {
  // let newCount = 0;
  // let canceledCount = 0;
  // let processedCount = 0;
  //
  // transactions.forEach(tx => {
  //   if (tx.status.name === "CANCELLED") {
  //     canceledCount++;
  //   } else if (tx.status.name === "PROCESSED") {
  //     processedCount++;
  //   } else {
  //     newCount++;
  //   }
  // });
  //
  // const data = {
  //   labels: ["Новые", "Обработанные", "Отмененные"],
  //   datasets: [
  //     {
  //       data: [newCount, processedCount, canceledCount],
  //       backgroundColor: ["#2196f3", "#4caf50", "#f44336"],
  //     },
  //   ],
  // };
  //
  // return (
  //   <div>
  //     <h3>Статистика по статусам транзакций</h3>
  //     <Doughnut data={data} />
  //   </div>
  // );
  const statusCounts = useMemo(() => {
    const counts = {
      [TRANSACTION_STATUS_TYPES.NEW]: 0,
      [TRANSACTION_STATUS_TYPES.CONFIRMED]: 0,
      [TRANSACTION_STATUS_TYPES.PROCESSING]: 0,
      [TRANSACTION_STATUS_TYPES.CANCELED]: 0,
      [TRANSACTION_STATUS_TYPES.COMPLETED]: 0,
      [TRANSACTION_STATUS_TYPES.DELETED]: 0,
      [TRANSACTION_STATUS_TYPES.RETURNED]: 0,
    };

    transactions.forEach((tx) => {
      if (tx.status && Object.prototype.hasOwnProperty.call(counts, tx.status.name)) {
        counts[tx.status.name]++;
      }
    });

    return counts;
  }, [transactions]);

  const data = {
    // labels: Object.keys(statusCounts),
    labels: ["Новая", "Подтверженная", "В обработке", "Отменена", "Платеж выполнен", "Возврат"],
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "#2196f3",
          "#4caf50",
          "#ff9800",
          "#f44336",
          "#9c27b0",
          "#795548",
          "#009688",
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Статистика по статусам транзакций</h3>
      <Doughnut data={data} />
    </div>
  );
}

export default Dashboard4;
