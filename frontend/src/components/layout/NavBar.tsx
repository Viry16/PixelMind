'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, LogIn, User, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NavBar() {
  const pathname = usePathname();
  const isEditor = pathname === '/editor';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isEditor ? 'bg-deep-onyx/95 border-b border-slate-dim/50' : ''
      }`}
    >
      <div className="glass-strong">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-violet to-violet-dim flex items-center justify-center transition-transform group-hover:scale-105">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-white-primary font-bold text-xl tracking-tight">
              Pixel<span className="text-electric-violet">Mind</span>
            </span>
          </Link>

          {/* Center Nav */}
          {!isEditor && (
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Gallery', href: '/gallery' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm text-slate-primary hover:text-white-primary hover:bg-onyx-elevated transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Credit Badge (shown in both) */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-onyx-elevated border border-slate-dim/50">
              <Coins className="w-4 h-4 text-warning" />
              <span className="text-white-primary text-sm font-medium">10</span>
            </div>

            {!isEditor ? (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-primary hover:text-white-primary hover:bg-onyx-elevated transition-all"
                  id="nav-login"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/editor"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-electric-violet to-violet-dim text-white text-sm font-semibold transition-all hover:shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:-translate-y-px"
                  id="nav-open-editor"
                >
                  Open Editor
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-onyx-elevated flex items-center justify-center hover:bg-onyx-hover transition-colors">
                  <User className="w-4 h-4 text-slate-primary" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
