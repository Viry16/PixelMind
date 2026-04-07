import type { AITool } from '@/types';

export const AI_TOOLS: AITool[] = [
  {
    id: 'remove-bg',
    name: 'Remove BG',
    description: 'Instantly remove the background from any image with precision edge detection.',
    icon: 'Scissors',
    creditCost: 1,
    requiresImage: true,
    requiresMask: false,
    requiresPrompt: false,
  },
  {
    id: 'remove-object',
    name: 'Object Removal',
    description: 'Paint over any unwanted object and watch it vanish seamlessly.',
    icon: 'Eraser',
    creditCost: 1,
    requiresImage: true,
    requiresMask: true,
    requiresPrompt: false,
  },
  {
    id: 'super-resolution',
    name: 'Super Resolution',
    description: 'Upscale any image to 4× resolution with AI-enhanced detail.',
    icon: 'Maximize2',
    creditCost: 2,
    requiresImage: true,
    requiresMask: false,
    requiresPrompt: false,
  },
  {
    id: 'product-photo',
    name: 'Product Photo',
    description: 'Transform product shots into studio-quality photography.',
    icon: 'ShoppingBag',
    creditCost: 1,
    requiresImage: true,
    requiresMask: false,
    requiresPrompt: true,
  },
  {
    id: 'replace-bg',
    name: 'Replace BG',
    description: 'Replace the background with any scene described in your prompt.',
    icon: 'Image',
    creditCost: 1,
    requiresImage: true,
    requiresMask: false,
    requiresPrompt: true,
  },
  {
    id: 'text-to-image',
    name: 'Text to Image',
    description: 'Generate stunning images from text descriptions using Stable Diffusion.',
    icon: 'Wand2',
    creditCost: 1,
    requiresImage: false,
    requiresMask: false,
    requiresPrompt: true,
  },
  {
    id: 'uncrop',
    name: 'Image Uncrop',
    description: 'Extend your image beyond its borders with AI outpainting.',
    icon: 'Expand',
    creditCost: 2,
    requiresImage: true,
    requiresMask: false,
    requiresPrompt: true,
  },
  {
    id: 'remove-text',
    name: 'Remove Text',
    description: 'Cleanly remove text, watermarks, and overlays from images.',
    icon: 'TypeIcon',
    creditCost: 1,
    requiresImage: true,
    requiresMask: false,
    requiresPrompt: false,
  },
];

export function getToolById(id: string): AITool | undefined {
  return AI_TOOLS.find((t) => t.id === id);
}

export function getToolCost(id: string): number {
  return getToolById(id)?.creditCost ?? 1;
}
