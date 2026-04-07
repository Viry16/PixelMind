import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelMind — AI-Powered Image Editing",
  description:
    "Professional AI image editing suite. Remove backgrounds, upscale images, generate art, and more — all powered by Stable Diffusion.",
  keywords: [
    "AI image editor",
    "remove background",
    "super resolution",
    "text to image",
    "stable diffusion",
    "image editing",
  ],
  openGraph: {
    title: "PixelMind — AI-Powered Image Editing",
    description: "Professional AI image editing suite powered by Stable Diffusion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-onyx text-white-primary">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#F8FAFC',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '10px',
            },
          }}
        />
      </body>
    </html>
  );
}
