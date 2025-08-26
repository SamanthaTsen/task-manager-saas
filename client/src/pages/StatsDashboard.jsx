import { useEffect, useState } from 'react';
import API from '../api'; 
import CompletionRateChart from '../components/CompletionRateChart';
import CategoryBreakdownChart from '../components/CategoryBreakdownChart';
import DailyTaskChart from '../components/DailyTaskChart';

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/tasks/stats'); 
        if (res.data && Object.keys(res.data).length > 0) {
          setStats(res.data);
        } else {
          setErrorMsg('No statistics available.');
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setErrorMsg('Failed to load statistics. Please check your login or try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading stats...</p>;
  if (errorMsg) return <p className="text-center text-red-500">{errorMsg}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Task Statistics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompletionRateChart completed={stats.completedTasks} total={stats.totalTasks} />
        <CategoryBreakdownChart breakdown={stats.categoryBreakdown} />
      </div>
      <DailyTaskChart daily={stats.dailyTaskCount} />
    </div>
  );
};

export default StatsDashboard;
