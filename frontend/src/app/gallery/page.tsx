'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import {
  Image as ImageIcon,
  Download,
  Share2,
  Trash2,
  Eye,
  Calendar,
  Wand2,
  ExternalLink,
  Plus,
} from 'lucide-react';

// Mock gallery data
const mockProjects = [
  {
    id: '1',
    title: 'Mountain Landscape',
    resultUrl: '',
    toolUsed: 'text-to-image',
    createdAt: '2026-03-30T10:00:00Z',
    gradient: 'from-violet-600 to-indigo-800',
  },
  {
    id: '2',
    title: 'Product Shot - Headphones',
    resultUrl: '',
    toolUsed: 'product-photo',
    createdAt: '2026-03-29T15:30:00Z',
    gradient: 'from-emerald-600 to-teal-800',
  },
  {
    id: '3',
    title: 'Portrait - BG Removed',
    resultUrl: '',
    toolUsed: 'remove-bg',
    createdAt: '2026-03-29T09:15:00Z',
    gradient: 'from-rose-600 to-pink-800',
  },
  {
    id: '4',
    title: 'City Skyline Upscaled',
    resultUrl: '',
    toolUsed: 'super-resolution',
    createdAt: '2026-03-28T20:00:00Z',
    gradient: 'from-amber-600 to-orange-800',
  },
  {
    id: '5',
    title: 'Abstract Art',
    resultUrl: '',
    toolUsed: 'text-to-image',
    createdAt: '2026-03-28T14:00:00Z',
    gradient: 'from-cyan-600 to-blue-800',
  },
  {
    id: '6',
    title: 'Product - Watch',
    resultUrl: '',
    toolUsed: 'replace-bg',
    createdAt: '2026-03-27T11:30:00Z',
    gradient: 'from-purple-600 to-fuchsia-800',
  },
];

const toolLabels: Record<string, string> = {
  'remove-bg': 'Remove BG',
  'remove-object': 'Object Removal',
  'super-resolution': 'Super Res',
  'product-photo': 'Product Photo',
  'replace-bg': 'Replace BG',
  'text-to-image': 'Text to Image',
  uncrop: 'Uncrop',
  'remove-text': 'Remove Text',
};

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');
  const filters = ['all', ...Object.keys(toolLabels)];

  const filteredProjects =
    filter === 'all'
      ? mockProjects
      : mockProjects.filter((p) => p.toolUsed === filter);

  return (
    <div className="min-h-screen bg-deep-onyx">
      <NavBar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold text-white-primary mb-2">Your Gallery</h1>
            <p className="text-slate-muted">All your AI-generated masterpieces in one place.</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-8 overflow-x-auto pb-2"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f
                    ? 'bg-electric-violet text-white'
                    : 'bg-onyx-surface text-slate-muted border border-slate-dim/30 hover:border-electric-violet/50 hover:text-slate-primary'
                }`}
              >
                {f === 'all' ? 'All Projects' : toolLabels[f] || f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {/* New Project Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href="/editor"
                  className="flex flex-col items-center justify-center h-full min-h-[280px] rounded-2xl border-2 border-dashed border-slate-dim/30 hover:border-electric-violet/50 bg-onyx-surface/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-onyx-elevated flex items-center justify-center mb-4 group-hover:bg-violet-ghost transition-colors">
                    <Plus className="w-6 h-6 text-slate-muted group-hover:text-electric-violet transition-colors" />
                  </div>
                  <p className="text-slate-muted text-sm font-medium group-hover:text-slate-primary transition-colors">
                    New Project
                  </p>
                </Link>
              </motion.div>

              {/* Project Cards */}
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl bg-onyx-surface border border-slate-dim/30 overflow-hidden hover:border-violet-border transition-all"
                >
                  {/* Image placeholder */}
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-white/20" />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-deep-onyx/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Tool badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-deep-onyx/70 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
                      <Wand2 className="w-3 h-3" />
                      {toolLabels[project.toolUsed] || project.toolUsed}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white-primary font-medium text-sm mb-1.5 truncate">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-dim">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-slate-dim mx-auto mb-4" />
              <p className="text-slate-muted">No projects with this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
