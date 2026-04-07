'use client';

import { useEditorStore } from '@/store/editorStore';
import { AI_TOOLS } from '@/lib/tools';
import { motion } from 'framer-motion';
import {
  MousePointer2,
  PaintBucket,
  Eraser,
  Type,
  Hand,
  Upload,
  Scissors,
  Maximize2,
  ShoppingBag,
  Image,
  Wand2,
  Expand,
} from 'lucide-react';
import type { EditorMode, AIToolId } from '@/types';

const modeTools: { id: EditorMode; icon: React.ElementType; label: string }[] = [
  { id: 'select', icon: MousePointer2, label: 'Select' },
  { id: 'mask', icon: PaintBucket, label: 'Mask Brush' },
  { id: 'erase', icon: Eraser, label: 'Eraser' },
  { id: 'text', icon: Type, label: 'Add Text' },
  { id: 'pan', icon: Hand, label: 'Pan' },
];

const toolIconMap: Record<string, React.ElementType> = {
  Scissors,
  Eraser,
  Maximize2,
  ShoppingBag,
  Image,
  Wand2,
  Expand,
  TypeIcon: Type,
};

export default function Toolbelt() {
  const editorMode = useEditorStore((s) => s.editorMode);
  const setEditorMode = useEditorStore((s) => s.setEditorMode);
  const selectedTool = useEditorStore((s) => s.selectedTool);
  const setSelectedTool = useEditorStore((s) => s.setSelectedTool);
  const setShowUploadZone = useEditorStore((s) => s.setShowUploadZone);

  return (
    <aside className="w-16 bg-onyx-surface border-r border-slate-dim/30 flex flex-col items-center py-4 gap-1 z-30">
      {/* Mode Tools */}
      <div className="flex flex-col items-center gap-1 pb-3 border-b border-slate-dim/30 mb-3">
        {modeTools.map((tool) => {
          const isActive = editorMode === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setEditorMode(tool.id)}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${
                isActive
                  ? 'bg-electric-violet text-white'
                  : 'text-slate-muted hover:text-white-primary hover:bg-onyx-elevated'
              }`}
              title={tool.label}
              id={`tool-mode-${tool.id}`}
            >
              <tool.icon className="w-4.5 h-4.5" />

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-onyx-elevated border border-slate-dim/50 text-xs text-white-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                {tool.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Upload button */}
      <button
        onClick={() => setShowUploadZone(true)}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-muted hover:text-white-primary hover:bg-onyx-elevated transition-all group"
        title="Upload Image"
        id="tool-upload"
      >
        <Upload className="w-4.5 h-4.5" />
        <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-onyx-elevated border border-slate-dim/50 text-xs text-white-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
          Upload Image
        </div>
      </button>

      {/* Divider */}
      <div className="w-6 h-px bg-slate-dim/30 my-2" />

      {/* AI Tools */}
      <div className="flex-1 flex flex-col items-center gap-1 overflow-y-auto scrollbar-thin">
        <span className="text-[9px] uppercase tracking-widest text-slate-dim mb-1 font-semibold">AI</span>

        {AI_TOOLS.map((tool) => {
          const IconComponent = toolIconMap[tool.icon] || Wand2;
          const isActive = selectedTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id as AIToolId)}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${
                isActive
                  ? 'bg-violet-ghost border border-violet-border text-electric-violet'
                  : 'text-slate-muted hover:text-white-primary hover:bg-onyx-elevated'
              }`}
              title={`${tool.name} (${tool.creditCost} credit${tool.creditCost > 1 ? 's' : ''})`}
              id={`tool-ai-${tool.id}`}
            >
              <IconComponent className="w-4 h-4" />

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="ai-tool-indicator"
                  className="absolute -right-px top-1/2 -translate-y-1/2 w-1 h-5 rounded-l-full bg-electric-violet"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-onyx-elevated border border-slate-dim/50 text-xs text-white-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                <span>{tool.name}</span>
                <span className="text-slate-muted ml-1.5">· {tool.creditCost}cr</span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
