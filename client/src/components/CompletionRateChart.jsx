import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CompletionRateChart = ({ completed, total }) => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ['#22c55e', '#e5e7eb'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="w-full h-72 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CompletionRateChart;
