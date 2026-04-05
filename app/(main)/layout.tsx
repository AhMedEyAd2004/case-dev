import React from "react";
import Navbar from "@/app/(layoutComponents)/nav-bar";
import WindowDimensions from "@/components/breakpoint";
import Footer from "@/app/(layoutComponents)/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mt-14 flex min-h-[calc(100dvh-56px)] flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </>
  );
}
