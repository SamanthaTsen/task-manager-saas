import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DailyTaskChart = ({ daily }) => {
  const labels = Object.keys(daily);
  const values = Object.values(daily);

  const data = {
    labels,
    datasets: [
      {
        label: 'Tasks per Day',
        data: values,
        borderColor: '#3b82f6',
        backgroundColor: '#93c5fd',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full h-72 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Daily Task Count</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyTaskChart;
