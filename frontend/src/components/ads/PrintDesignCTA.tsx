'use client';

import { motion } from 'framer-motion';
import { Printer, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface PrintDesignCTAProps {
  imageUrl: string | null;
}

export default function PrintDesignCTA({ imageUrl }: PrintDesignCTAProps) {
  if (!imageUrl) return null;

  const handlePrint = () => {
    toast.success('Redirecting to print partner...');
    // In production, this would redirect to a print-on-demand service
    // and track the click as an ad impression
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onClick={handlePrint}
      className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-slate-dim/30 hover:border-violet-border hover:bg-violet-ghost/30 transition-all group"
      id="print-design-cta"
    >
      <div className="w-9 h-9 rounded-lg bg-onyx-elevated flex items-center justify-center group-hover:bg-violet-ghost transition-colors">
        <Printer className="w-4 h-4 text-slate-muted group-hover:text-electric-violet transition-colors" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-white-primary text-sm font-medium">Print this Design</p>
        <p className="text-slate-dim text-xs">Order a poster or canvas print</p>
      </div>
      <ExternalLink className="w-4 h-4 text-slate-dim group-hover:text-electric-violet transition-colors" />
    </motion.button>
  );
}
