import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { constructMetadata } from "@/lib/utils";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/Providers";

const recursive = Recursive({ subsets: ["latin-ext"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={recursive.className}>
          <NavBar />
          <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
            <div className="flex flex-1 flex-col h-full">
              <Providers>{children}</Providers>
            </div>
            <Footer />
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
