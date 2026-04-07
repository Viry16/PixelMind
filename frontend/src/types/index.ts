// ═══════════════════════════════════════════
// PixelMind — TypeScript Interfaces
// ═══════════════════════════════════════════

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  credits: number;
  createdAt: string;
}

export type AIToolId =
  | 'remove-bg'
  | 'remove-object'
  | 'super-resolution'
  | 'product-photo'
  | 'replace-bg'
  | 'text-to-image'
  | 'uncrop'
  | 'remove-text';

export interface AITool {
  id: AIToolId;
  name: string;
  description: string;
  icon: string;
  creditCost: number;
  requiresImage: boolean;
  requiresMask: boolean;
  requiresPrompt: boolean;
}

export interface AIRequest {
  tool: AIToolId;
  image?: File | null;
  mask?: string | null; // base64
  prompt?: string;
  strength?: number;
  seed?: number;
}

export interface AIResponse {
  success: boolean;
  resultUrl?: string;
  remainingCredits?: number;
  error?: string;
  processingTime?: number;
}

export interface Project {
  id: string;
  title: string;
  imageUrl: string | null;
  resultUrl: string | null;
  toolUsed: string | null;
  prompt: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'DEDUCTION' | 'DAILY_RESET' | 'AD_REFILL' | 'ADMIN_GRANT';
  detail: string | null;
  createdAt: string;
}

export interface AdImpression {
  adType: 'sponsored_palette' | 'print_cta' | 'video_refill';
  adBrand?: string;
  clicked?: boolean;
}

export type EditorMode = 'select' | 'mask' | 'erase' | 'text' | 'pan';

export interface EditorSettings {
  prompt: string;
  strength: number;
  seed: number;
  brushSize: number;
}

export interface SponsoredPaletteData {
  brand: string;
  name: string;
  colors: string[];
  tagline: string;
}
