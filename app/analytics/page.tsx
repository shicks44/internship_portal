'use client';

import { useState, useEffect } from 'react';
import { getApplicationHistory, getAnalytics } from '../actions';

export default function AnalyticsPage() {
  const [applicantID, setApplicantID] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, accepted: 0, rejected: 0, pending: 0 });
  const [loading, setLoading] = useState(false);

  // Load data whenever the Applicant ID changes (Simulated Login)
  async function loadData() {
    if (!applicantID) return;
    setLoading(true);

    const historyData = await getApplicationHistory(parseInt(applicantID));
    const statsData = await getAnalytics(parseInt(applicantID));

    setHistory(historyData);
    setStats(statsData);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER & LOGIN SIMULATION */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">My Applications Dashboard</h1>
          <div className="flex gap-2 bg-slate-900 border border-slate-700 p-2 rounded-xl">
            <input 
              value={applicantID}
              onChange={(e) => setApplicantID(e.target.value)}
              placeholder="Enter Applicant ID"
              className="bg-slate-950 border border-slate-600 rounded px-2 py-1 text-sm w-32 text-center text-white"
            />
            <button 
              onClick={loadData}
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold px-3 py-1 rounded transition-colors"
            >
              Load Data
            </button>
          </div>
        </div>

        {/* --- ANALYTICS CARDS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Applications" value={stats.total} color="bg-slate-800" />
          <StatCard label="Pending" value={stats.pending} color="bg-yellow-900/30 border-yellow-600/50 text-yellow-400" />
          <StatCard label="Accepted" value={stats.accepted} color="bg-emerald-900/30 border-emerald-600/50 text-emerald-400" />
          <StatCard label="Rejected" value={stats.rejected} color="bg-rose-900/30 border-rose-600/50 text-rose-400" />
        </div>

        {/* --- HISTORY TABLE --- */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold">Application History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950 text-slate-200 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center">Loading data...</td></tr>
                ) : history.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No applications found. Try applying for a job first!</td></tr>
                ) : (
                  history.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-mono text-slate-500">
                        {new Date(row.submissionDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-medium text-slate-200">{row.title}</td>
                      <td className="p-4">{row.companyName}</td>
                      <td className="p-4">
                        <StatusBadge status={row.statusName} />
                      </td>
                      <td className="p-4 italic opacity-70">{row.notes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for Cleaner UI
function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className={`p-4 rounded-xl border border-transparent shadow-lg ${color}`}>
      <p className="text-xs uppercase tracking-wider opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color = 'bg-slate-700 text-slate-300';
  if (status === 'Submitted') color = 'bg-blue-900/50 text-blue-300 border border-blue-700';
  if (status === 'Accepted!') color = 'bg-emerald-900/50 text-emerald-300 border border-emerald-700';
  if (status === 'Rejected') color = 'bg-rose-900/50 text-rose-300 border border-rose-700';
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}