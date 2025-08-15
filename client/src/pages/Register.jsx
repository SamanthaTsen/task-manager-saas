import { useState } from 'react';
import API from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    try {
      await API.post('/auth/signup', { email, password });
      setMessage('Registration successful, please log in');
      setError(false);
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage('Registration failed：' + (err.response?.data?.message || 'Please try again later'));
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Registration</h2>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 p-2 border rounded w-64"
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="mb-4 p-2 border rounded w-64"
      />
      <button
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Registration
      </button>

      {message && (
        <p className={`mt-4 text-sm ${error ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}