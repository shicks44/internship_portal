'use client';

import { useState } from 'react';
import { postInternship } from '../actions';
import { useRouter } from 'next/navigation';

export default function RecruiterPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await postInternship(formData);
    setMessage(result.message);
    
    // Optional: Redirect to search page to "Validate" the insertion
    if (result.success) {
      setTimeout(() => router.push('/search'), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-700 p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-400">Post New Internship</h1>
          <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
            Company ID: 1
          </span>
        </div>

        {message && (
          <div className="p-4 mb-6 rounded-xl bg-emerald-900/20 border border-emerald-500 text-emerald-200">
            {message}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" placeholder="Job Title (e.g. Backend Intern)" required className="input-std" />
            <input name="location" placeholder="Location (e.g. Remote)" required className="input-std" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input name="salary" type="number" placeholder="Salary (e.g. 60000)" className="input-std" />
             {/* Read-only field just to show the user what will happen */}
             <input value="Status: Open" readOnly className="input-std opacity-60 cursor-not-allowed" />
          </div>

          <textarea 
            name="description" 
            placeholder="Job Description..." 
            rows={4} 
            className="input-std w-full"
            required
          />

          <textarea 
            name="requirements" 
            placeholder="Requirements (e.g. Python, SQL, Git)..." 
            rows={2} 
            className="input-std w-full"
          />

          <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 mt-4">
            Publish Internship
          </button>
        </form>
      </div>
    </div>
  );
}