import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

/* inset in tailwind means 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    */

export default function Phone({
  dark = false,
  className,
  imgSrc,
  ...props
}: { dark?: boolean; className?: string; imgSrc: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("pointer-events-none relative z-50 w-fit overflow-hidden", className)}
      {...props}
    >
      <Image
        alt="phone-template"
        src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
        width={256}
        height={523}
        className="pointer-events-none h-130.75! w-[256px]! object-cover select-none"
      />

      <div className="absolute inset-0 -z-10">
        <Image src={imgSrc} alt="dog" width={256} height={523} className="object-cover" />
      </div>
    </div>
  );
}
