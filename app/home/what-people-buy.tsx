"use client";
import Phone from "@/components/phone";
import { verticalLoop } from "@/lib/gsap/seemlessLoop";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WhatPeopleBuy() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const loops: unknown[] = [];

      //each screen size has different animation setup, so we use matchMedia to handle that
      const mm = gsap.matchMedia();
      mm.add(
        {
          is_base: "(max-width: 767px)",
          is_md: "(min-width: 768px) and (max-width: 1023px)",
          is_lg: "(min-width: 1024px)",
        },
        (context) => {
          loops.length = 0; // during resize elements will keep pushing to this array, need to clear previous loops
          const { is_base, is_md, is_lg } = context.conditions as Record<string, boolean>;
          const [normalSpeed, slowerSpeed] = [0.6, 0.4];
          if (is_base) {
            const loop_1 = gsap.utils.toArray(".loop");
            loops.push(
              verticalLoop(loop_1, {
                paused: true,
                repeat: -1,
                speed: normalSpeed,
              }),
            );
          }

          if (is_md) {
            const loop_1 = gsap.utils.toArray(".loop:nth-child(2n+1)");
            const loop_2 = gsap.utils.toArray(".loop:nth-child(2n+2)");
            loops.push(
              verticalLoop(loop_1, {
                paused: true,
                repeat: -1,
                speed: normalSpeed,
              }),
              verticalLoop(loop_2, {
                paused: true,
                repeat: -1,
                speed: slowerSpeed,
              }),
            );
          }

          if (is_lg) {
            const loop_1 = gsap.utils.toArray(".loop:nth-child(3n+1)");
            const loop_2 = gsap.utils.toArray(".loop:nth-child(3n+2)");
            const loop_3 = gsap.utils.toArray(".loop:nth-child(3n+3)");
            loops.push(
              verticalLoop(loop_1, { paused: true, repeat: -1, speed: normalSpeed }),
              verticalLoop(loop_2, { paused: true, repeat: -1, speed: slowerSpeed }),
              verticalLoop(loop_3, { paused: true, repeat: -1, speed: normalSpeed }),
            );
          }
        },
      );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%", // fires when top of container hits 80% down the viewport
        onEnter: () => {
          loops.forEach((loop) => (loop as gsap.core.Timeline).play());
          gsap.to(".loop", { opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" });
        },
      });

      return () => mm.revert();
    },
    {
      scope: containerRef,
    },
  );

  /* max-h-[150dvh] would only kick in if 150dvh is smaller than 784px,
   which would require the viewport to be shorter than ~523px tall.
    That's an extremely rare edge case (maybe a tiny browser window). 
    =====================================================
    height how it works is diffrent from width, because the width is resizable at any time
    so u set w and max to not exceed it, while h the max h can be later smaller that the current h
    from laptop to mobile for example */
  return (
    <div
      ref={containerRef}
      // black means visible, transparent means invisible
      className="mx-auto grid h-196 max-h-[150dvh] max-w-4xl grid-cols-1 items-start gap-8 mask-[linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] p-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {[...PHONES, ...PHONES].map((src, index) => {
        return (
          <Phone
            key={index}
            imgSrc={src}
            className="loop w-full rounded-[2.15rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5"
          />
        );
      })}
    </div>
  );
}
