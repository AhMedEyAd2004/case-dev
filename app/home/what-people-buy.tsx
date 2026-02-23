"use client";
import MaxContainerWrap from "@/components/max-container";
import Phone from "@/components/phone";
import { verticalLoop } from "@/lib/gsap/seemlessLoop";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// ScrollTrigger.positionInViewport(element, "top");

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

gsap.registerPlugin(useGSAP);

export default function WhatPeopleBuy() {
  // useGSAP(() => {
  //   const boxes = gsap.utils.toArray(".box");

  //   verticalLoop(boxes, {
  //     paused: false,
  //     repeat: -1,
  //     speed: 1,
  //   });
  // });

  return (
    <section className="pt-16">
      <MaxContainerWrap classname="relative overflow-hidden md:mx-auto">
        <Image
          src={"/what-people-are-buying.png"}
          alt="what people are buying"
          width={180}
          height={100}
          className="absolute top-1/2 hidden -translate-1/2 xl:block"
        />

        {/* max-h-[150dvh] would only kick in if 150dvh is smaller than 784px,
         which would require the viewport to be shorter than ~523px tall.
          That's an extremely rare edge case (maybe a tiny browser window). */}
        {/* height how it works is diffrent from width, because the width is resizable at any time
          so u set w and max to not exceed it, while h the max h can be later smaller that the current h
          from laptop to mobile for example */}

        <div className="mx-auto grid h-196 max-h-[150dvh] max-w-4xl auto-rows-auto grid-cols-1 items-start gap-8 mask-[linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] p-8 md:grid-cols-2 lg:grid-cols-3">
          <Phone
            imgSrc={"/testimonials/1.jpg"}
            className="rounded-[2.15rem] bg-white shadow-xl shadow-slate-900/5"
          />
          <Phone
            imgSrc={"/testimonials/1.jpg"}
            className="rounded-[2.15rem] bg-white shadow-xl shadow-slate-900/5"
          />
          <Phone
            imgSrc={"/testimonials/1.jpg"}
            className="rounded-[2.15rem] bg-white shadow-xl shadow-slate-900/5"
          />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
          <div className="h-100 rounded-[2.15rem] bg-white p-6 shadow-xl shadow-slate-900/5" />
        </div>

        {/* <div
          className="ms:mt-20 relative mt-16 grid h-[200%] max-h-[150vh] max-w-4xl grid-cols-1 gap-x-8 overflow-hidden px-4 md:mx-auto md:grid-cols-2 lg:grid-cols-3"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {[...PHONES, ...PHONES].map((p, index) => (
            <Phone
              key={index}
              imgSrc={p}
              className="box pointer-events-none my-8 box-border overflow-hidden rounded-[2.25rem] bg-white object-contain shadow-xl shadow-slate-900/5 select-none"
            />
          ))}
        </div> */}
      </MaxContainerWrap>
    </section>
  );
}
