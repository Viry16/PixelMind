'use client';

import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import type { SponsoredPaletteData } from '@/types';

const palettes: SponsoredPaletteData[] = [
  {
    brand: 'Pantone',
    name: 'Midnight Violet',
    colors: ['#2E1065', '#4C1D95', '#6D28D9', '#8B5CF6', '#A78BFA'],
    tagline: 'Curated for dark interfaces',
  },
  {
    brand: 'Adobe Color',
    name: 'Sunset Ember',
    colors: ['#7C2D12', '#C2410C', '#EA580C', '#FB923C', '#FED7AA'],
    tagline: 'Warm tones for product photography',
  },
  {
    brand: 'Coolors',
    name: 'Ocean Depth',
    colors: ['#0C4A6E', '#0369A1', '#0EA5E9', '#38BDF8', '#BAE6FD'],
    tagline: 'Inspired by the deep sea',
  },
];

export default function SponsoredPalette() {
  const palette = palettes[Math.floor(Math.random() * palettes.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-xl bg-onyx-elevated/80 border border-slate-dim/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-3.5 h-3.5 text-violet-glow" />
        <span className="text-[10px] text-slate-dim uppercase tracking-widest font-semibold">
          Sponsored Palette
        </span>
      </div>

      <div className="flex gap-1.5 mb-3">
        {palette.colors.map((color) => (
          <div
            key={color}
            className="flex-1 h-8 rounded-lg cursor-pointer transition-transform hover:scale-110 hover:-translate-y-0.5"
            style={{ background: color }}
            title={color}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-white-primary text-xs font-medium">{palette.name}</p>
          <p className="text-[10px] text-slate-dim">{palette.tagline}</p>
        </div>
        <span className="text-[9px] text-slate-dim bg-onyx-surface px-2 py-0.5 rounded-full">
          by {palette.brand}
        </span>
      </div>
    </motion.div>
  );
}
