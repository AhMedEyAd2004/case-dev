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
      <WindowDimensions />
      <main className="flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </>
  );
}
