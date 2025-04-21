import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import mockTransactionTimelineData from "./mockTransactionTimelineData.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TimelineChart = () => {
  const labels = mockTransactionTimelineData.map(item => item.label);
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество транзакций',
        data: mockTransactionTimelineData.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Динамика транзакций по месяцам',
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default TimelineChart;
