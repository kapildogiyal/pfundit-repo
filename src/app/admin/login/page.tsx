'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F5FF] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-[#0f1b3d]/10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#0f1b3d]">Pfundit Admin</h1>
          <p className="mt-2 text-sm text-[#0f1b3d]/60">Sign in to manage job postings</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#0f1b3d]/70">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-[#0f1b3d]/20 bg-[#F0F5FF]/50 px-4 py-3 text-sm focus:border-[#D4A437] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4A437]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#0f1b3d]/70">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#0f1b3d]/20 bg-[#F0F5FF]/50 px-4 py-3 text-sm focus:border-[#D4A437] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D4A437]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-full bg-[#0f1b3d] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0f1b3d]/90 hover:shadow-lg disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
