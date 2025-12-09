'use client';

import { useState } from 'react';
import { searchInternships, submitApplication, InternshipResult } from '../actions';

export default function SearchPage() {
  const [results, setResults] = useState<InternshipResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // SIMULATED LOGIN STATE
  // In a real app, this comes from a cookie/session. Here, you type it manually.
  const [applicantID, setApplicantID] = useState('');

  async function handleSearch(formData: FormData) {
    setIsSearching(true);
    const data = await searchInternships(formData);
    setResults(data);
    setHasSearched(true);
    setIsSearching(false);
  }

  async function handleApply(internshipID: number) {
    if (!applicantID) {
      alert("Please enter your Applicant ID at the top right to apply.");
      return;
    }

    // Create a FormData object to send to the server action
    const formData = new FormData();
    formData.append('applicantID', applicantID);
    formData.append('internshipID', internshipID.toString());

    const result = await submitApplication(formData);
    alert(result.message);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER & LOGIN SIMULATION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-cyan-400">Find Your Internship</h1>
          
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 p-2 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-bold px-2">Simulate Login:</span>
            <input 
              value={applicantID}
              onChange={(e) => setApplicantID(e.target.value)}
              placeholder="Enter Your Applicant ID"
              className="bg-slate-950 border border-slate-600 rounded px-2 py-1 text-sm w-40 text-center outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* --- SEARCH FORM --- */}
        <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-2xl shadow-xl mb-8">
          <form action={handleSearch} className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Keyword</label>
              <input name="keyword" placeholder="Job title or Company..." className="input-std" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</label>
              <input name="location" placeholder="City or Remote..." className="input-std" />
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={isSearching} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-xl transition-colors disabled:opacity-50">
                {isSearching ? 'Searching...' : 'Search Jobs'}
              </button>
            </div>
          </form>
        </div>

        {/* --- RESULTS SECTION --- */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-slate-800 pb-2">
            Results {hasSearched && `(${results.length})`}
          </h2>

          {hasSearched && results.length === 0 && (
            <div className="p-8 text-center text-slate-400 bg-slate-900/30 rounded-xl border border-dashed border-slate-700">
              No internships found. Try different keywords!
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {results.map((job) => (
              <div key={job.internshipID} className="group p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-900">
                      ID: {job.internshipID}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">
                    <span className="text-slate-200 font-medium">{job.companyName}</span> • {job.location}
                  </p>
                  <p className="text-slate-500 text-xs line-clamp-2 mt-2 mb-4">
                    {job.description}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleApply(job.internshipID)}
                  className="w-full py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all font-semibold text-sm"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}