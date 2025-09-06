import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);


  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful！');
      setError(false);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000); 
    } catch (err) {
      setMessage('Login failed: wrong account or password');
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
         Task Manager
      </h1>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
         New here? If you don't have an account, <a href="/register" className="text-blue-600 underline font-semibold hover:text-blue-800">create one now</a> and join us!
      </p>


      {message && (
        <p className={`mt-4 text-sm ${error ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
