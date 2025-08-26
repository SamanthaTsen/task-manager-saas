import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryBreakdownChart = ({ breakdown }) => {
  const labels = Object.keys(breakdown);
  const values = Object.values(breakdown);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#f87171', '#60a5fa', '#facc15', '#34d399'],
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
      <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryBreakdownChart; 
