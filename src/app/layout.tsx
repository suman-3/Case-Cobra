import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Case Cobra",
  description: "Create custom high-quality phone cases in seconds",
};

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
        </body>
      </html>
    </ClerkProvider>
  );
}
