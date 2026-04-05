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
  const isHidden = useRef(false);

  useGSAP(() => {
    const nav = containerRef.current;
    if (!nav) return;

    const navHeight = nav.getBoundingClientRect().height;
    const isScrollable = () => window.scrollY > navHeight;

    const snapToTop = () => {
      gsap.killTweensOf(nav);
      gsap.set(nav, { y: 0 });
      isHidden.current = false;
    };

    Observer.create({
      target: window,
      type: "wheel,touch",
      tolerance: 15,

      onDown: () => {
        if (!isScrollable()) return;
        isHidden.current = false;
        gsap.to(nav, {
          y: "-100%",
          duration: 1,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            isHidden.current = true;
          },
        });
      },

      onUp: () => {
        if (!isScrollable()) {
          snapToTop();
          return;
        }
        if (isHidden.current) {
          snapToTop(); // fully hidden: snap instantly, no animation
        } else {
          gsap.to(nav, { y: 0, duration: 0.6, ease: "power2.out", overwrite: true });
        }
      },
    });
  });

  return (
    <nav ref={containerRef} className={cn("", className)} {...props}>
      {children}
    </nav>
  );
}
