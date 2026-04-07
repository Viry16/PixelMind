'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthColors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Account created! Welcome to PixelMind 🎨');
    setIsLoading(false);
    window.location.href = '/editor';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 gradient-mesh relative">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-electric-violet/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-violet-dim/8 rounded-full blur-[80px]" />

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
          <h1 className="text-2xl font-bold text-white-primary mb-2">Create your account</h1>
          <p className="text-slate-muted">Start with 10 free credits — no card required</p>
        </div>

        {/* Form Card */}
        <div className="glass-strong rounded-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-primary mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-onyx-elevated border border-slate-dim/50 text-white-primary placeholder:text-slate-dim focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet/30 transition-all text-sm"
                  required
                />
              </div>
            </div>

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
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-muted hover:text-slate-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Bar */}
              {password.length > 0 && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < passwordStrength()
                            ? strengthColors[passwordStrength() - 1]
                            : 'bg-slate-dim/50'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-muted">
                    {passwordStrength() > 0 ? strengthLabels[passwordStrength() - 1] : 'Too short'}
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-electric-violet to-violet-dim text-white font-semibold transition-all hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:-translate-y-px disabled:opacity-50 disabled:pointer-events-none"
              id="register-submit"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-slate-dim/30 space-y-2">
            {['10 free credits daily', 'Access all 8 AI tools', 'Save to your gallery'].map(
              (item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-muted">
                  <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <p className="text-center text-slate-muted text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-electric-violet hover:text-violet-glow transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
