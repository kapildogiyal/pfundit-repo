'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Job = {
  id: string;
  title: string;
  type: string;
  category: string;
  tags: string[];
  description?: string;
};

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Job>>({});
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const isNew = !currentJob.id;
    const url = isNew ? '/api/jobs' : `/api/jobs/${currentJob.id}`;
    const method = isNew ? 'POST' : 'PUT';

    // Ensure tags is an array
    let tagsArray = currentJob.tags || [];
    if (typeof tagsArray === 'string') {
      tagsArray = (tagsArray as string).split(',').map((t) => t.trim()).filter(Boolean);
    }

    const payload = {
      ...currentJob,
      tags: tagsArray,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchJobs();
        setIsEditing(false);
        setCurrentJob({});
      } else {
        alert('Failed to save job');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchJobs();
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const openEditModal = (job?: Job) => {
    if (job) {
      setCurrentJob({ ...job, tags: job.tags, description: job.description || '' });
    } else {
      setCurrentJob({ title: '', type: 'Full-Time', category: 'Technology', tags: [], description: '' });
    }
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4A437] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0f1b3d]">Job Postings</h1>
          <p className="text-[#0f1b3d]/60">Manage your open roles</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => openEditModal()}
            className="flex items-center gap-2 rounded-full bg-[#0f1b3d] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#0f1b3d]/90 hover:shadow-lg"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add New Job
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-[#0f1b3d]/20 bg-white px-5 py-2.5 text-sm font-bold text-[#0f1b3d] transition-all hover:bg-[#F0F5FF]"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#0f1b3d]/10 bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#0f1b3d]">
            <thead className="bg-[#F0F5FF]/50 text-xs uppercase text-[#0f1b3d]/60">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">ID</th>
                <th className="px-6 py-4 font-bold tracking-wider">Title</th>
                <th className="px-6 py-4 font-bold tracking-wider">Category</th>
                <th className="px-6 py-4 font-bold tracking-wider">Type</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0f1b3d]/5">
              {jobs.map((job) => (
                <tr key={job.id} className="transition-colors hover:bg-[#F0F5FF]/30">
                  <td className="px-6 py-4 font-mono text-[#D4A437]">{job.id}</td>
                  <td className="px-6 py-4 font-bold">{job.title}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#0f1b3d]/5 px-2.5 py-1 text-xs font-semibold text-[#0f1b3d]/70">
                      {job.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#0f1b3d]/70">{job.type}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEditModal(job)}
                      className="mr-3 font-semibold text-[#D4A437] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="font-semibold text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#0f1b3d]/50">
                    No jobs found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1b3d]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0f1b3d]">
                {currentJob.id ? 'Edit Job Posting' : 'Create New Job'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-full p-2 text-[#0f1b3d]/50 hover:bg-[#F0F5FF] hover:text-[#0f1b3d]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#0f1b3d]/70">Title</label>
                  <input
                    required
                    type="text"
                    value={currentJob.title || ''}
                    onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                    className="w-full rounded-xl border border-[#0f1b3d]/20 bg-[#F0F5FF]/50 px-4 py-2.5 text-sm focus:border-[#D4A437] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#0f1b3d]/70">Category</label>
                  <select
                    required
                    value={currentJob.category || ''}
                    onChange={(e) => setCurrentJob({ ...currentJob, category: e.target.value })}
                    className="w-full rounded-xl border border-[#0f1b3d]/20 bg-[#F0F5FF]/50 px-4 py-2.5 text-sm focus:border-[#D4A437] focus:bg-white focus:outline-none"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#0f1b3d]/70">Type</label>
                  <select
                    required
                    value={currentJob.type || ''}
                    onChange={(e) => setCurrentJob({ ...currentJob, type: e.target.value })}
                    className="w-full rounded-xl border border-[#0f1b3d]/20 bg-[#F0F5FF]/50 px-4 py-2.5 text-sm focus:border-[#D4A437] focus:bg-white focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Advisory">Advisory</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#0f1b3d]/70">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={
                      Array.isArray(currentJob.tags)
                        ? currentJob.tags.join(', ')
                        : currentJob.tags || ''
                    }
                    onChange={(e) => setCurrentJob({ ...currentJob, tags: e.target.value as any })}
                    placeholder="e.g. AI/ML, Credit Risk"
                    className="w-full rounded-xl border border-[#0f1b3d]/20 bg-[#F0F5FF]/50 px-4 py-2.5 text-sm focus:border-[#D4A437] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-[#0f1b3d]/70">Description</label>
                <textarea
                  value={currentJob.description || ''}
                  onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-xl border border-[#0f1b3d]/20 bg-[#F0F5FF]/50 px-4 py-2.5 text-sm focus:border-[#D4A437] focus:bg-white focus:outline-none"
                  placeholder="Job description..."
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-full px-5 py-2.5 text-sm font-bold text-[#0f1b3d]/60 hover:text-[#0f1b3d]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="rounded-full bg-[#0f1b3d] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0f1b3d]/90 disabled:opacity-70"
                >
                  {formLoading ? 'Saving...' : 'Save Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
