'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import {
  Zap,
  Check,
  Star,
  ArrowRight,
  Coins,
  Scissors,
  Eraser,
  Maximize2,
  Wand2,
  ShoppingBag,
  Image,
  Expand,
  Type,
  Play,
} from 'lucide-react';

const toolPricing = [
  { icon: Scissors, name: 'Remove BG', cost: 1 },
  { icon: Eraser, name: 'Object Removal', cost: 1 },
  { icon: Maximize2, name: 'Super Resolution', cost: 2 },
  { icon: ShoppingBag, name: 'Product Photo', cost: 1 },
  { icon: Image, name: 'Replace BG', cost: 1 },
  { icon: Wand2, name: 'Text to Image', cost: 1 },
  { icon: Expand, name: 'Image Uncrop', cost: 2 },
  { icon: Type, name: 'Remove Text', cost: 1 },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-deep-onyx">
      <NavBar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-ghost border border-violet-border text-sm text-violet-glow mb-6">
              <Coins className="w-4 h-4" />
              Credit System
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white-primary mb-4">
              Simple. Transparent. Free.
            </h1>
            <p className="text-slate-muted text-lg max-w-xl mx-auto">
              No subscriptions, no credit cards. Get 10 credits daily and earn more by watching short sponsored videos.
            </p>
          </motion.div>

          {/* Main Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* Free Daily */}
            <div className="relative p-8 rounded-2xl glass-strong overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-electric-violet/5 rounded-full blur-[60px]" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-violet-ghost flex items-center justify-center">
                    <Zap className="w-6 h-6 text-electric-violet" />
                  </div>
                  <div>
                    <h2 className="text-white-primary font-bold text-xl">Daily Free</h2>
                    <p className="text-slate-muted text-sm">Reset every 24 hours</p>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-6xl font-bold text-white-primary">10</span>
                  <span className="text-xl text-slate-muted ml-2">credits/day</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'All 8 AI tools available',
                    'Full-quality exports',
                    'Personal gallery storage',
                    'No watermarks',
                    'Resets at midnight UTC',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-slate-primary text-sm">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/editor"
                  className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-electric-violet to-violet-dim text-white font-semibold transition-all hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:-translate-y-px"
                >
                  Start Creating Free
                </Link>
              </div>
            </div>

            {/* Ad Refill */}
            <div className="relative p-8 rounded-2xl glass-strong overflow-hidden border border-violet-border/30">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-warning/10 border border-warning/30 text-warning text-xs font-semibold">
                Instant Refill
              </div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-warning/5 rounded-full blur-[60px]" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h2 className="text-white-primary font-bold text-xl">Watch & Earn</h2>
                    <p className="text-slate-muted text-sm">No limit per day</p>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-6xl font-bold text-white-primary">+5</span>
                  <span className="text-xl text-slate-muted ml-2">credits/video</span>
                </div>

                <div className="p-4 rounded-xl bg-onyx-elevated/50 mb-8">
                  <div className="flex items-start gap-3">
                    <Play className="w-5 h-5 text-electric-violet mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white-primary text-sm font-medium mb-1">How it works</p>
                      <p className="text-slate-muted text-xs leading-relaxed">
                        When you run out of credits, watch a 30-second sponsored video.
                        Credits are added instantly — no waiting, no sign-up friction.
                        This is how PixelMind stays free for everyone.
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    '30-second non-intrusive videos',
                    '+5 credits per video watched',
                    'Credits never expire (per session)',
                    'Watch anytime — no limit',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-slate-primary text-sm">
                      <Check className="w-4 h-4 text-warning flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/editor"
                  className="block w-full text-center py-3.5 rounded-xl border border-slate-dim/50 text-slate-primary font-semibold hover:border-electric-violet hover:text-violet-glow hover:bg-violet-ghost transition-all"
                >
                  Open Editor
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Tool Cost Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white-primary text-center mb-8">
              Credit Cost Per Tool
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {toolPricing.map((tool) => (
                <div
                  key={tool.name}
                  className="p-4 rounded-xl bg-onyx-surface border border-slate-dim/30 hover:border-violet-border/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-onyx-elevated flex items-center justify-center group-hover:bg-violet-ghost transition-colors">
                      <tool.icon className="w-4 h-4 text-slate-muted group-hover:text-electric-violet transition-colors" />
                    </div>
                    <span className="text-white-primary text-sm font-medium">{tool.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-warning" />
                    <span className="text-electric-violet font-bold">{tool.cost}</span>
                    <span className="text-slate-dim text-xs">
                      credit{tool.cost > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
