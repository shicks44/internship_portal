'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteNavbar() {
  const pathname = usePathname();

  const links = [
    { href: '/search', label: '🔍 Find Jobs' },
    { href: '/register', label: '👤 Register' },
    { href: '/recruiter', label: '📢 Post Job' },
    { href: '/analytics', label: '📊 My Apps' },
    { href: '/test', label: '🔌 DB Check' },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Internship Portal
        </Link>

        {/* LINKS */}
        <div className="flex gap-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-slate-800 text-cyan-400 shadow-sm shadow-black/40' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}