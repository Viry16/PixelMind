'use client';

import { useCallback, useRef } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ImageIcon, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function EditorCanvas() {
  const originalImage = useEditorStore((s) => s.originalImage);
  const resultImage = useEditorStore((s) => s.resultImage);
  const isProcessing = useEditorStore((s) => s.isProcessing);
  const showUploadZone = useEditorStore((s) => s.showUploadZone);
  const setOriginalImage = useEditorStore((s) => s.setOriginalImage);
  const setShowUploadZone = useEditorStore((s) => s.setShowUploadZone);
  const editorMode = useEditorStore((s) => s.editorMode);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string, file);
      };
      reader.readAsDataURL(file);
    },
    [setOriginalImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    noClick: !showUploadZone,
    noDrag: !showUploadZone && !!originalImage,
  });

  const displayImage = resultImage || originalImage;

  // Upload Zone
  if (showUploadZone && !originalImage) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
        <div {...getRootProps()} className="w-full max-w-xl aspect-[4/3] outline-none cursor-pointer">
          <input {...getInputProps()} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${
              isDragActive
                ? 'border-electric-violet bg-violet-ghost scale-[1.02]'
                : 'border-slate-dim/50 hover:border-electric-violet/50 hover:bg-onyx-surface/50'
            }`}
            id="canvas-upload-zone"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                isDragActive ? 'bg-electric-violet' : 'bg-onyx-elevated'
              }`}
            >
              {isDragActive ? (
                <ImageIcon className="w-7 h-7 text-white" />
              ) : (
                <Upload className="w-7 h-7 text-slate-muted" />
              )}
            </div>

            <div className="text-center">
              <p className="text-white-primary font-medium mb-1">
                {isDragActive ? 'Drop your image here' : 'Drag & drop an image'}
              </p>
              <p className="text-slate-muted text-sm">
                or click to browse · PNG, JPG, WebP
              </p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-dim uppercase tracking-wider">or use</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUploadZone(false);
                }}
                className="text-xs text-electric-violet hover:text-violet-glow font-medium transition-colors"
              >
                Text to Image →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div ref={canvasRef} className="absolute inset-0 flex items-center justify-center">
      <TransformWrapper
        initialScale={1}
        minScale={0.25}
        maxScale={5}
        centerOnInit
        wheel={{ step: 0.08 }}
        panning={{ disabled: editorMode !== 'pan' && editorMode !== 'select' }}
      >
        {(context: any) => {
          const { zoomIn, zoomOut, resetTransform, state, transformState, instance } = context;
          const scale = state?.scale ?? transformState?.scale ?? instance?.transformState?.scale ?? 1;
          
          return (
          <>
            {/* Zoom Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-1.5 rounded-xl glass-strong">
              <button
                onClick={() => zoomOut()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-muted hover:text-white-primary hover:bg-onyx-elevated transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-primary font-mono w-12 text-center">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={() => zoomIn()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-muted hover:text-white-primary hover:bg-onyx-elevated transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-slate-dim/50 mx-1" />

              <button
                onClick={() => resetTransform()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-muted hover:text-white-primary hover:bg-onyx-elevated transition-all"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Canvas */}
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimatePresence mode="wait">
                {displayImage ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`relative rounded-xl overflow-hidden shadow-2xl ${
                      isProcessing ? 'shimmer-border' : ''
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displayImage}
                      alt="Editing canvas"
                      className="max-w-[70vw] max-h-[70vh] object-contain rounded-xl"
                      draggable={false}
                    />

                    {/* Result badge */}
                    {resultImage && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-success/20 border border-success/30 text-success text-xs font-medium">
                        Result
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3 text-slate-dim"
                  >
                    <ImageIcon className="w-16 h-16" />
                    <p className="text-sm">
                      Select <span className="text-electric-violet">Text to Image</span> to generate, or upload an image
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </TransformComponent>
          </>
        );
        }}
      </TransformWrapper>
    </div>
  );
}
