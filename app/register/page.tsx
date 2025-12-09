'use client';

import { useState } from 'react';
import { registerApplicant } from '../actions';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await registerApplicant(formData);
    
    setMessage(result.message);
    setIsError(!result.success);

    // REMOVED: The setTimeout that was auto-redirecting
  }

  function handleDismiss() {
    setMessage('');
    // Only redirect if it was a success. If it was an error, just clear message.
    if (!isError) {
      router.push('/search');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-700 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-cyan-400">Student Registration</h1>
        <p className="text-slate-400 mb-6">Create your profile to start applying.</p>

        {/* UPDATED MESSAGE BOX */}
        {message && (
          <div className={`p-4 mb-6 rounded-xl border flex justify-between items-center ${isError ? 'bg-rose-900/20 border-rose-500 text-rose-200' : 'bg-emerald-900/20 border-emerald-500 text-emerald-200'}`}>
            <span>{message}</span>
            <button 
              onClick={handleDismiss}
              className={`px-4 py-1 rounded-lg font-bold text-sm transition-colors ml-4
                ${isError 
                  ? 'bg-rose-500/20 hover:bg-rose-500/40 text-rose-100' 
                  : 'bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-100'}`}
            >
              Okay
            </button>
          </div>
        )}

        {/* Hide form if success to prevent double submission */}
        {!message || isError ? (
          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-1">Login Details</h3>
            </div>
            
            <input name="firstName" placeholder="First Name *" required className="input-std" />
            <input name="lastName" placeholder="Last Name *" required className="input-std" />
            <input name="email" type="email" placeholder="Email Address *" required className="input-std" />
            <input name="password" type="password" placeholder="Password *" required className="input-std" />
            <input name="telNo" placeholder="Phone Number" className="input-std" />

            <div className="space-y-4 md:col-span-2 mt-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-1">Student Profile</h3>
            </div>

            <input name="fieldOfStudy" placeholder="Major (e.g. CS)" className="input-std" />
            <input name="gpa" type="number" step="0.01" placeholder="GPA (e.g. 3.8)" className="input-std" />
            <input name="gradYear" type="number" placeholder="Grad Year (e.g. 2026)" className="input-std" />
            <input name="age" type="number" placeholder="Age" className="input-std" />
            <input name="resumeUrl" placeholder="Link to Resume (URL)" className="input-std md:col-span-2" />

            <div className="md:col-span-2 mt-6">
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-900/20">
                Create Account
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}