import { ReactNode } from "react";
import Steps from "./steps";
import Image from "next/image";
import MaxContainerWrap from "@/components/max-container";

// alot of flex flex-col flex-1, because i want the full height of min-h-[calc(100dvh-(4rem+4rem+8px))]
// but problem is it has (min) if i removed it the page will always be that constant height which is not what i want
// i want to be min of that height and h-full doesnt work because it needs a parent with "defined height"
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full flex-col">
      <Image
        src="/upload-bg.png"
        alt="upload background"
        fill
        className="pointer-events-none -z-10 select-none"
      />
      <MaxContainerWrap className="flex min-h-[calc(100dvh-(4rem+4rem+8px))] w-full flex-1 flex-col gap-16 pt-14 pb-10">
        <Steps />
        <span className="flex flex-1 flex-col">{children}</span>
      </MaxContainerWrap>
    </section>
  );
}
