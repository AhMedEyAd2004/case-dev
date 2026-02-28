import { ReactNode } from "react";
import Steps from "./upload/steps";
import Image from "next/image";
import MaxContainerWrap from "@/components/max-container";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="relative h-[calc(100dvh-(4rem+4rem+8px))]">
      <Image
        src="/upload-bg.png"
        alt="upload background"
        fill
        className="pointer-events-none -z-10 select-none"
      />
      <MaxContainerWrap className="flex h-full flex-col gap-16 pb-10">
        <Steps />
        <span className="flex-1">{children}</span>
      </MaxContainerWrap>
    </section>
  );
}
