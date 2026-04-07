'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Coins, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface VideoAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoAdModal({ isOpen, onClose }: VideoAdModalProps) {
  const [phase, setPhase] = useState<'intro' | 'watching' | 'complete'>('intro');
  const [countdown, setCountdown] = useState(30);
  const setCredits = useEditorStore((s) => s.setCredits);
  const credits = useEditorStore((s) => s.credits);

  const handleRefill = useCallback(() => {
    setCredits(credits + 5);
    setPhase('complete');
    toast.success('+5 credits added! 🎉');
  }, [credits, setCredits]);

  useEffect(() => {
    if (phase !== 'watching') return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRefill();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, handleRefill]);

  const handleClose = () => {
    setPhase('intro');
    setCountdown(30);
    onClose();
  };

  const startWatching = () => {
    setPhase('watching');
    setCountdown(30);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-onyx/80 backdrop-blur-sm"
        onClick={(e) => {
          if (phase !== 'watching' && e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full max-w-md glass-strong rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-dim/30">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-warning" />
              <h3 className="text-white-primary font-semibold">Credit Refill</h3>
            </div>
            {phase !== 'watching' && (
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-muted hover:text-white-primary hover:bg-onyx-elevated transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {phase === 'intro' && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-violet-ghost mx-auto mb-6 flex items-center justify-center">
                  <Play className="w-8 h-8 text-electric-violet" />
                </div>
                <h4 className="text-xl text-white-primary font-bold mb-2">
                  Watch to Earn Credits
                </h4>
                <p className="text-slate-muted text-sm mb-6 max-w-xs mx-auto">
                  Watch a 30-second sponsored video and receive <span className="text-electric-violet font-semibold">+5 credits</span> instantly.
                </p>

                <button
                  onClick={startWatching}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-electric-violet to-violet-dim text-white font-semibold transition-all hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:-translate-y-px"
                  id="watch-ad-btn"
                >
                  Watch Video — Get +5 Credits
                </button>

                <p className="text-slate-dim text-xs mt-4">
                  No account required. Credits are added instantly.
                </p>
              </div>
            )}

            {phase === 'watching' && (
              <div className="text-center">
                {/* Mock Video Player */}
                <div className="relative w-full aspect-video rounded-xl bg-onyx-elevated mb-6 overflow-hidden">
                  {/* Animated gradient to simulate video */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${(30 - countdown) * 12}deg, #4C1D95, #7C3AED, #8B5CF6, #6D28D9)`,
                      transition: 'background 1s ease',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-1">Sponsored Content</p>
                      <p className="text-white text-2xl font-bold">PixelMind Pro</p>
                      <p className="text-white/40 text-xs mt-1">Design Without Limits™</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-onyx-surface/50">
                    <motion.div
                      className="h-full bg-electric-violet"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 30, ease: 'linear' }}
                    />
                  </div>
                </div>

                {/* Countdown */}
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-electric-violet flex items-center justify-center">
                    <span className="text-electric-violet font-bold text-lg">{countdown}</span>
                  </div>
                  <p className="text-slate-primary text-sm">seconds remaining</p>
                </div>
              </div>
            )}

            {phase === 'complete' && (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-20 h-20 rounded-2xl bg-success/10 mx-auto mb-6 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>
                <h4 className="text-xl text-white-primary font-bold mb-2">Credits Added!</h4>
                <p className="text-slate-muted text-sm mb-2">
                  You now have <span className="text-electric-violet font-semibold">{credits} credits</span>
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-electric-violet to-violet-dim text-white font-semibold transition-all hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)]"
                >
                  Continue Creating
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
