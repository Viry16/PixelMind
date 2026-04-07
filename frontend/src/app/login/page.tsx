'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Welcome back to PixelMind!');
    setIsLoading(false);

    // In production: call loginUser() from api.ts, store token, redirect
    window.location.href = '/editor';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 gradient-mesh relative">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-electric-violet/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-violet-dim/8 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-violet to-violet-dim flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white-primary font-bold text-2xl tracking-tight">
              Pixel<span className="text-electric-violet">Mind</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white-primary mb-2">Welcome back</h1>
          <p className="text-slate-muted">Sign in to your creative workspace</p>
        </div>

        {/* Form Card */}
        <div className="glass-strong rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-primary mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="designer@pixelmind.ai"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-onyx-elevated border border-slate-dim/50 text-white-primary placeholder:text-slate-dim focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet/30 transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-primary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-onyx-elevated border border-slate-dim/50 text-white-primary placeholder:text-slate-dim focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet/30 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-muted hover:text-slate-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-electric-violet to-violet-dim text-white font-semibold transition-all hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:-translate-y-px disabled:opacity-50 disabled:pointer-events-none"
              id="login-submit"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-dim/50" />
            <span className="text-slate-dim text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-dim/50" />
          </div>

          {/* Demo Login */}
          <button
            onClick={() => {
              setEmail('demo@pixelmind.ai');
              setPassword('demo1234');
              toast.success('Demo credentials filled!');
            }}
            className="w-full py-3 rounded-xl border border-slate-dim/50 text-slate-primary text-sm font-medium hover:border-electric-violet hover:text-violet-glow hover:bg-violet-ghost transition-all"
            id="demo-login"
          >
            Use Demo Account
          </button>
        </div>

        {/* Switch to register */}
        <p className="text-center text-slate-muted text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-electric-violet hover:text-violet-glow transition-colors font-medium">
            Create one free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
