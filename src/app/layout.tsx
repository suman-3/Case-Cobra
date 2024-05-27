import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { constructMetadata } from "@/lib/utils";
import Footer from "@/components/Footer";

const recursive = Recursive({ subsets: ["latin-ext"] });

export const metadata = constructMetadata()

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
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
