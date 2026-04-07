'use client';

import { useEditorStore } from '@/store/editorStore';
import NavBar from '@/components/layout/NavBar';
import Toolbelt from '@/components/editor/Toolbelt';
import EditorCanvas from '@/components/editor/EditorCanvas';
import AISettingsPanel from '@/components/editor/AISettingsPanel';

export default function EditorPage() {
  const isProcessing = useEditorStore((s) => s.isProcessing);

  return (
    <>
      <NavBar />

      {/* Main editor body below nav */}
      <div className="flex-1 flex pt-16 overflow-hidden">
        {/* Left Sidebar — Toolbelt */}
        <Toolbelt />

        {/* Center — Canvas */}
        <main className="flex-1 relative overflow-hidden bg-deep-onyx">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <EditorCanvas />

          {/* Processing overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-deep-onyx/40 backdrop-blur-[2px] flex items-center justify-center z-40 pointer-events-none">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-slate-dim/30" />
                  <div className="absolute inset-0 rounded-full border-2 border-electric-violet border-t-transparent animate-spin" />
                  <div className="absolute inset-2 rounded-full border-2 border-violet-glow/50 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                </div>
                <p className="text-slate-primary text-sm font-medium animate-pulse">
                  AI is working its magic...
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar — AI Settings */}
        <AISettingsPanel />
      </div>
    </>
  );
}
