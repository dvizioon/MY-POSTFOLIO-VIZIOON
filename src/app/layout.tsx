
"use client"; 

import type { ReactNode } from 'react';
import { useState } from 'react'; 
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/layout/Footer';
// Header and PaletteInfoModal are now managed by PortfolioClientPage for modal interactions
// Or, if global, Header needs to be here and manage PaletteInfoModal state locally if it doesn't affect other parts.

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata should be exported from a server component, typically the root layout if it's a server component.
// If layout.tsx is "use client", metadata export here is problematic.
// For now, we'll assume PortfolioClientPage might handle dynamic titles or this can be static in a parent server component.
// export const metadata: Metadata = {
// title: 'DVIION Portfolio',
// description: 'Interactive 3D portfolio showcase for DVIION Technology by Firebase Studio',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If Header needs to be global and trigger a modal whose state is here, this layout needs to be "use client"
  // and handle the modal state, or the modal state needs to be in a global context.
  // For simplicity, PortfolioClientPage handles Header & PaletteInfoModal for now.

  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {/* This div is for the CSS starry background */}
        <div className="stars-bg"></div>
        {/* Default lang is "pt", LanguageProvider will handle actual display lang based on user preference/storage */}
        <LanguageProvider>
          <ThemeProvider>
            {/* Header is now rendered by PortfolioClientPage or specific page layouts */}
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
            <Toaster />
            {/* PaletteInfoModal is now rendered by PortfolioClientPage */}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
