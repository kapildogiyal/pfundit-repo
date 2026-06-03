import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Pfundit - Disciplined AI-Native Credit for the Real Economy | Singapore",
  description: 'Pfundit is a Singapore holding company building a regulated, AI-enabled lending platform for India and Asia - focused on short-tenor, cash-flow secured financing in the real economy.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f1b3d',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-[#0f1b3d] selection:text-white">
        {children}
      </body>
    </html>
  );
}

