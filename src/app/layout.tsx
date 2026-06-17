import type { Metadata, Viewport } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const APP_NAME = "Sondhani Lab";
const APP_DEFAULT_TITLE = "Sondhani Lab Reports";
const APP_TITLE_TEMPLATE = "%s - Sondhani Lab";
const APP_DESCRIPTION = "Offline-first medical lab report system for Sondhani Group";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  keywords: ["Lab Report", "Medical", "Sondhani Group", "Offline Lab", "PWA"],
  authors: [{ name: "Sondhani Labs" }],
  creator: "Sondhani Group",
  publisher: "Sondhani Group",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: "https://sondhanilab.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    creator: "@sondhanilab",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
        <footer className="w-full py-12">
          <div className="container max-w-4xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sondhani DDC. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
