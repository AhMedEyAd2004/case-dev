import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/queryProvider";
import { constructMetaData } from "@/lib/metadata";

const recursice = Recursive({
  subsets: ["latin"],
  variable: "--font-recursive",
});

export const metadata: Metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${recursice.variable} font-recursive overflow-x-hidden bg-slate-50 antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
