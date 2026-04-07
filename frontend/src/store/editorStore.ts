'use client';

import { create } from 'zustand';
import type { AIToolId, EditorMode, EditorSettings } from '@/types';

interface EditorState {
  // Image state
  originalImage: string | null;
  resultImage: string | null;
  originalFile: File | null;

  // Tool state
  selectedTool: AIToolId;
  editorMode: EditorMode;
  settings: EditorSettings;

  // Processing state
  isProcessing: boolean;
  processingProgress: number;

  // Mask state
  maskDataUrl: string | null;

  // UI state
  showUploadZone: boolean;
  zoom: number;

  // Credits
  credits: number;

  // Actions
  setOriginalImage: (image: string | null, file?: File | null) => void;
  setResultImage: (image: string | null) => void;
  setSelectedTool: (tool: AIToolId) => void;
  setEditorMode: (mode: EditorMode) => void;
  updateSettings: (settings: Partial<EditorSettings>) => void;
  setIsProcessing: (processing: boolean) => void;
  setProcessingProgress: (progress: number) => void;
  setMaskDataUrl: (url: string | null) => void;
  setShowUploadZone: (show: boolean) => void;
  setZoom: (zoom: number) => void;
  setCredits: (credits: number) => void;
  resetEditor: () => void;
}

const defaultSettings: EditorSettings = {
  prompt: '',
  strength: 0.75,
  seed: 42,
  brushSize: 30,
};

export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  originalImage: null,
  resultImage: null,
  originalFile: null,
  selectedTool: 'remove-bg',
  editorMode: 'select',
  settings: { ...defaultSettings },
  isProcessing: false,
  processingProgress: 0,
  maskDataUrl: null,
  showUploadZone: true,
  zoom: 1,
  credits: 10,

  // Actions
  setOriginalImage: (image, file = null) =>
    set({ originalImage: image, originalFile: file, showUploadZone: !image, resultImage: null }),
  setResultImage: (image) => set({ resultImage: image }),
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setEditorMode: (mode) => set({ editorMode: mode }),
  updateSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
  setIsProcessing: (processing) => set({ isProcessing: processing, processingProgress: 0 }),
  setProcessingProgress: (progress) => set({ processingProgress: progress }),
  setMaskDataUrl: (url) => set({ maskDataUrl: url }),
  setShowUploadZone: (show) => set({ showUploadZone: show }),
  setZoom: (zoom) => set({ zoom }),
  setCredits: (credits) => set({ credits }),
  resetEditor: () =>
    set({
      originalImage: null,
      resultImage: null,
      originalFile: null,
      selectedTool: 'remove-bg',
      editorMode: 'select',
      settings: { ...defaultSettings },
      isProcessing: false,
      processingProgress: 0,
      maskDataUrl: null,
      showUploadZone: true,
    }),
}));
