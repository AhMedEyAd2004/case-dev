"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode, useRef } from "react";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Observer, useGSAP);
export default function NavObserver({
  className,
  children,
  ...props
}: { className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    Observer.create({
      target: window, // can be any element (selector text is fine)
      type: "wheel,touch", // comma-delimited list of what to listen for
      tolerance: 100, // minimum distance(px) before recognizing a scroll
      onUp: () => gsap.to(containerRef.current, { y: 0, duration: 0.6, ease: "power2.out" }),
      onDown: () => gsap.to(containerRef.current, { y: -100, duration: 1, ease: "power2.out" }),
    });
  });
  return (
    <nav ref={containerRef} className={cn("", className)} {...props}>
      {children}
    </nav>
  );
}
