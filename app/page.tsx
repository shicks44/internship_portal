import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex flex-col items-center justify-center text-center p-4">
      
      <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[100px] w-[500px] h-[500px] absolute rounded-full pointer-events-none" />

      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-6 z-10">
        Launch Your Career.
      </h1>
      
      <p className="text-slate-400 text-lg max-w-2xl mb-10 z-10 leading-relaxed">
        The ultimate platform for students to find tech internships and for recruiters to find top talent. 
        Secure, fast, and built with Next.js & MySQL.
      </p>

      <div className="flex flex-wrap gap-4 z-10 justify-center">
        <Link 
          href="/search"
          className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-900/30 transition-all hover:scale-105"
        >
          Browse Internships
        </Link>
        <Link 
          href="/register"
          className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold rounded-2xl transition-all hover:scale-105"
        >
          Student Registration
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-500 text-sm font-mono uppercase tracking-widest z-10">
        <p>100% Remote Friendly</p>
        <p>Verified Recruiters</p>
        <p>Real-time Tracking</p>
        <p>MySQL Database</p>
      </div>
    </div>
  );
}