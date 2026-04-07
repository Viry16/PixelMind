'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  CreditCard,
  ArrowRight,
  Scissors,
  Eraser,
  Maximize2,
  ShoppingBag,
  Image,
  Wand2,
  Expand,
  Type,
  Star,
  Check,
} from 'lucide-react';
import NavBar from '@/components/layout/NavBar';

const tools = [
  { icon: Scissors, name: 'Remove BG', desc: 'Instantly strip backgrounds with precision edge detection', color: '#8B5CF6' },
  { icon: Eraser, name: 'Object Removal', desc: 'Paint over unwanted elements and watch them vanish', color: '#A78BFA' },
  { icon: Maximize2, name: 'Super Resolution', desc: 'Upscale to 4× with AI-enhanced sharpness & detail', color: '#6D28D9' },
  { icon: ShoppingBag, name: 'Product Photo', desc: 'Transform product shots into studio-quality imagery', color: '#8B5CF6' },
  { icon: Image, name: 'Replace BG', desc: 'Swap backgrounds with any scene from your imagination', color: '#A78BFA' },
  { icon: Wand2, name: 'Text to Image', desc: 'Generate stunning visuals from text descriptions', color: '#6D28D9' },
  { icon: Expand, name: 'Image Uncrop', desc: 'Extend images beyond their borders with outpainting', color: '#8B5CF6' },
  { icon: Type, name: 'Remove Text', desc: 'Cleanly erase text, watermarks, and overlays', color: '#A78BFA' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-deep-onyx">
      <NavBar />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-electric-violet/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-dim/10 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-ghost border border-violet-border text-sm text-violet-glow mb-8">
              <Sparkles className="w-4 h-4" />
              Powered by Stable Diffusion
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-white-primary">Edit Images with</span>
            <br />
            <span className="bg-gradient-to-r from-electric-violet via-violet-glow to-electric-violet bg-clip-text text-transparent">
              AI Superpowers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-primary max-w-2xl mx-auto mb-10"
          >
            Remove backgrounds, upscale resolution, generate art from text, and more —
            all in a pro-grade editor built for designers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/editor"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-electric-violet to-violet-dim text-white font-semibold text-lg transition-all hover:shadow-[0_8px_40px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
            >
              Open Editor
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-dim text-slate-primary font-medium text-lg transition-all hover:border-electric-violet hover:text-violet-glow hover:bg-violet-ghost"
            >
              <CreditCard className="w-5 h-5" />
              View Credits
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ TOOLS GRID ═══ */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white-primary">8 AI Tools.</span>{' '}
              <span className="text-slate-primary">One Workspace.</span>
            </h2>
            <p className="text-slate-muted text-lg max-w-xl mx-auto">
              Every tool a designer needs, powered by state-of-the-art diffusion models.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl bg-onyx-surface border border-slate-dim/50 transition-all hover:border-violet-border hover:bg-onyx-elevated cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ background: `${tool.color}15` }}
                >
                  <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                </div>
                <h3 className="text-white-primary font-semibold text-lg mb-2">{tool.name}</h3>
                <p className="text-slate-muted text-sm leading-relaxed">{tool.desc}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 px-6 bg-onyx-surface/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white-primary mb-4">How It Works</h2>
            <p className="text-slate-muted text-lg">Three steps. Zero complexity.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload', desc: 'Drag & drop your image onto the canvas or generate from text.' },
              { step: '02', title: 'Choose AI Tool', desc: 'Select from 8 powerful AI tools and fine-tune parameters.' },
              { step: '03', title: 'Export', desc: 'Download your result in full quality or save to your gallery.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-b from-electric-violet to-violet-dim bg-clip-text text-transparent mb-4">
                  {item.step}
                </div>
                <h3 className="text-white-primary text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CREDIT SYSTEM PREVIEW ═══ */}
      <section className="py-24 px-6" id="pricing">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white-primary mb-4">
              Simple Credit System
            </h2>
            <p className="text-slate-muted text-lg max-w-xl mx-auto">
              10 free credits daily. Need more? Watch a quick ad to refill instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-3xl glass-strong"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Free Tier */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-ghost flex items-center justify-center">
                    <Zap className="w-5 h-5 text-electric-violet" />
                  </div>
                  <div>
                    <h3 className="text-white-primary font-semibold text-lg">Free Tier</h3>
                    <p className="text-slate-muted text-sm">Reset every 24 hours</p>
                  </div>
                </div>

                <div className="text-5xl font-bold text-white-primary mb-2">
                  10 <span className="text-lg text-slate-muted font-normal">credits/day</span>
                </div>

                <ul className="space-y-3 mt-6">
                  {[
                    'Remove BG — 1 credit',
                    'Object Removal — 1 credit',
                    'Super Resolution — 2 credits',
                    'Text to Image — 1 credit',
                    'All 8 AI tools included',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-primary text-sm">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-64 bg-slate-dim" />

              {/* Refill */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-ghost flex items-center justify-center">
                    <Star className="w-5 h-5 text-violet-glow" />
                  </div>
                  <div>
                    <h3 className="text-white-primary font-semibold text-lg">Need More?</h3>
                    <p className="text-slate-muted text-sm">Instant refill</p>
                  </div>
                </div>

                <div className="text-5xl font-bold text-white-primary mb-2">
                  +5 <span className="text-lg text-slate-muted font-normal">credits/ad</span>
                </div>

                <p className="text-slate-primary text-sm mt-6 leading-relaxed">
                  Watch a 30-second sponsored video and get 5 more credits instantly.
                  No credit cards, no subscriptions — just keep creating.
                </p>

                <Link
                  href="/editor"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-violet to-violet-dim text-white font-semibold transition-all hover:shadow-[0_8px_40px_rgba(139,92,246,0.3)]"
                >
                  Start Creating Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 px-6 border-t border-slate-dim/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-violet to-violet-dim flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white-primary font-semibold text-lg">PixelMind</span>
          </div>

          <div className="flex items-center gap-8" id="footer-links">
            {['Features', 'Pricing', 'Gallery', 'About'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-slate-muted text-sm hover:text-violet-glow transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <p className="text-slate-dim text-sm">
            © 2026 PixelMind. Software Engineering Project.
          </p>
        </div>
      </footer>
    </div>
  );
}
