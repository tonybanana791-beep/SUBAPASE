import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  const login = async () => {
    const res = await axios.post('http://localhost:3001/login', { email, password });
    setToken(res.data.token);
  };

  const getData = async () => {
    const res = await axios.get('http://localhost:3001/data', { headers: { Authorization: `Bearer ${token}` } });
    setData(res.data);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Clone (Express)</h1>
      <input placeholder="Email" className="border p-2 mr-2" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="border p-2 mr-2" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={login} className="bg-blue-500 text-white p-2">Login</button>
      <button onClick={getData} className="bg-green-500 text-white p-2 ml-2">Get Data</button>
      <pre className="mt-4 bg-gray-100 p-2">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
