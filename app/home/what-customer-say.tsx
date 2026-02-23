import MaxContainerWrap from "@/components/max-container";
import StarsGroup from "@/components/stars-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import Image from "next/image";

const CUSTOMER_COMMENT = [
  {
    customer_name: "Jonathan",
    customer_img: "/users/user-1.png",
    rating: 5,
    description:
      "The case feels durable and I even got a compliment on the design. Had the case for two and a half months now and the image is super clear, on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it.",
  },
  {
    customer_name: "Josh",
    customer_img: "/users/user-4.jpg",
    rating: 4.5,
    description:
      "I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner, looks brand new after about half a year. I dig it.",
  },
];

/*Imagine you have 3 items with different content lengths — a short word, a long sentence, and a medium phrase:
With flex: auto (basis: auto) → each item gets its content size plus an equal share of leftover space.
 Items with more content stay wider.
With flex: 1 (basis: 0%) → all items end up the exact same width, content size is completely ignored. */

export default function WhatCustomerSay() {
  return (
    <section className="min-h-60 w-screen bg-slate-100 pt-26.25">
      <MaxContainerWrap>
        <h3 className="flex flex-col-reverse items-center justify-center gap-4 text-center text-[48px] leading-tight font-bold tracking-tight text-balance text-gray-900 sm:gap-6 md:text-[60px] lg:flex-row lg:text-left lg:text-6xl">
          <div>
            What our{" "}
            <span className="relative">
              customers
              <WiggleLine />
            </span>{" "}
            say
          </div>
          <Image src={"/snake-2.png"} alt="snake-2" width={95} height={85} />
        </h3>

        {/* use grid when u want precise control over your children,
            but here u only have 2 children beside eachother (row)
             or above eachother (col) */}
        <div className="mt-10 flex flex-col justify-between gap-x-7 max-lg:divide-y divide-gray-400/40 lg:mt-32.25 lg:flex-row">
          {CUSTOMER_COMMENT.map((c, index) => (
            <div key={index} className="mx-auto flex max-w-2xl flex-col gap-4 py-8">
              <StarsGroup rating={c.rating} className="mb-2 size-5" />
              <p className="text-[18px] text-pretty text-black">&quot;{c.description}&quot;</p>
              <div className="mt-2 flex gap-4">
                <Avatar className="size-12">
                  <AvatarImage className="object-cover" src={c.customer_img} alt={`User1`} />
                  <AvatarFallback>U{index + 1}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-[16px] leading-6 font-semibold">{c.customer_name}</p>
                  <p className="flex items-center justify-center gap-1 text-[14px]">
                    <Check className="size-4 text-green-500" />
                    Verified Purchase
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxContainerWrap>
    </section>
  );
}

const WiggleLine = () => (
  <svg
    className="pointer-events-none absolute inset-x-0 -bottom-8 -left-2 hidden w-[110%] text-green-500 sm:block"
    viewBox="0 0 687 155"
  >
    <g
      stroke="currentColor"
      strokeWidth="7"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"
        opacity=".3"
      ></path>
      <path d="M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"></path>
    </g>
  </svg>
);
