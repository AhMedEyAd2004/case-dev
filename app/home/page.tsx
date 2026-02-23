import MaxContainerWrap from "@/components/max-container";
import Phone from "@/components/phone";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import Image from "next/image";
import WhatCustomerSay from "./what-customer-say";
import StarsGroup from "@/components/stars-group";
import WhatPeopleBuy from "./what-people-buy";

export default function Home() {
  //calc the navbar height and subtract it from the viewport height to get the minimum height of the section.
  //  This ensures that the section takes up the full remaining height of the viewport, even if the navbar is fixed at the top.
  // So max-w-prose limits the line length to about 65 characters per line, which is considered the sweet spot for readable text.

  /* text-balance => tries to make all lines similar length (v.good 4 text-center items)
    Build beautiful
    interfaces faster
   
    text-wrap
    Build beautiful interfaces 
    faster*/

  return (
    <>
      <MaxContainerWrap>
        <section className="mb-20 grid min-h-[calc(100dvh-4rem)] grid-rows-2 place-items-center pt-15 lg:mb-50 lg:grid-cols-3 lg:grid-rows-1 lg:pt-40">
          <div className="relative flex flex-col lg:col-span-2">
            <Image
              src={"/snake-1.png"}
              alt="snake"
              width={112}
              height={146}
              className="absolute -top-35 hidden lg:block"
            />
            <h2 className="text-center text-[48px] leading-tight font-bold tracking-tight text-balance text-gray-900 md:text-[60px] lg:text-left lg:text-7xl">
              Your Image on a <span className="bg-green-600 px-2 text-white">Custom</span> Phone
              Case
            </h2>
            <p className="mt-8 max-w-prose text-center text-[18px] text-balance md:max-w-full lg:text-left">
              Capture your favorite memories with your own, <strong>one-of-one</strong> phone case.
              CaseCobra allows you to protect your memories, not just your phone case.
            </p>
            <ul className="flex flex-col gap-2 py-8 max-lg:mx-auto">
              <li className="flex gap-1 font-medium">
                <Check className="text-green-500" />
                High-quality, durable material
              </li>
              <li className="flex gap-1 font-medium">
                <Check className="text-green-500" />5 year print guarantee
              </li>
              <li className="flex gap-1 font-medium">
                <Check className="text-green-500" />
                Modern iPhone models supported
              </li>
            </ul>
            <div className="flex flex-col items-center justify-center gap-5 pt-4 sm:flex-row lg:justify-start">
              <AvatarGroup>
                <Avatar size="lg">
                  <AvatarImage className="object-cover" src={`/users/user-1.png`} alt={`User1`} />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage className="object-cover" src={`/users/user-2.png`} alt={`User2`} />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage className="object-cover" src={`/users/user-3.png`} alt={`User3`} />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage className="object-cover" src={`/users/user-4.jpg`} alt={`User4`} />
                  <AvatarFallback>U4</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage className="object-cover" src={`/users/user-5.jpg`} alt={`User5`} />
                  <AvatarFallback>U5</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <div className="flex flex-col items-center sm:items-start">
                <StarsGroup rating={5} />
                <p className="text-[16px]">
                  <span className="font-bold">1,250</span> happy customers
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex w-fit justify-center max-lg:mt-25">
            <Image
              src={"/line.png"}
              alt="line"
              width={80}
              height={143}
              className="absolute -bottom-5 -left-5"
            />
            <Image
              src={"/your-image.png"}
              alt="your-imagel-handwritten"
              width={208}
              height={144}
              className="absolute -top-20 -right-40 hidden xl:block"
            />
            <Phone imgSrc={"/testimonials/1.jpg"} />
          </div>
        </section>
      </MaxContainerWrap>
      <WhatCustomerSay />
      <WhatPeopleBuy />
    </>
  );
}
