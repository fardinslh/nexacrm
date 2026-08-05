import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { TopLoader } from '@/components/layout/top-loader';

const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-vazirmatn' });

export const metadata: Metadata = {
  title: 'NexaCRM | مدیریت ارتباط با مشتری',
  description: 'سیستم هوشمند مدیریت ارتباط با مشتری',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>
            <Suspense fallback={null}>
              <TopLoader />
            </Suspense>
            {children}
            <Toaster dir="rtl" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
