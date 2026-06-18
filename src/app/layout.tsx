import type { Metadata, Viewport } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const APP_NAME = "Sondhani DDC";
const APP_DEFAULT_TITLE = "Sondhani DDC";
const APP_TITLE_TEMPLATE = "%s - Sondhani DDC";
const APP_DESCRIPTION = "Offline-first medical lab report management system for Sondhani DDC";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  keywords: ["Lab Report", "Medical", "Sondhani DDC", "Sondhani Group", "Offline Lab", "PWA", "Diagnostic Center"],
  authors: [{ name: "Sondhani DDC" }],
  creator: "Sondhani DDC",
  publisher: "Sondhani DDC",
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
    url: "https://sondhani-report.vercel.app",
    locale: "en_US",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Sondhani DDC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ["/icon-512x512.png"],
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
          <div className="container max-w-4xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground space-y-1">
            <p>© {new Date().getFullYear()} Sondhani DDC. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a
                href="https://nafis-sadiq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
              >
                Nafis Sadiq
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
