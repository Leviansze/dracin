import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { WatchHistoryProvider } from "@/contexts/WatchHistoryContext";
import { LayoutContent } from "@/components/LayoutContent";
import { FloatingSocial } from "@/components/FloatingSocial";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DramaCinaID - Streaming Drama Pendek",
  description: "Nonton drama pendek gratis dan tanpa iklan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <SidebarProvider>
            <WatchHistoryProvider>
              <LayoutContent>{children}</LayoutContent>
              <FloatingSocial />
              <Toaster />
              <Sonner />
            </WatchHistoryProvider>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
