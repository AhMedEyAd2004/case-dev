import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

/* inset in tailwind means 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    */

/*
    The fill prop requires the parent to have position:
    relative (or absolute/fixed) and a defined size (width and height).
     The wrapper div has relative but needs an explicit width — 
     fill images can't infer size from just aspect-ratio alone. */

export default function Phone({
  dark = false,
  className,
  imgSrc,
  ...props
}: { dark?: boolean; className?: string; imgSrc: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pointer-events-none w-[256px]", className)} {...props}>
      <div className="relative z-50 aspect-256/523 w-full overflow-hidden">
        <Image
          alt="phone-template"
          src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
          fill
        />

        <div className="absolute inset-0 -z-10">
          <Image src={imgSrc} alt="dog" fill />
        </div>
      </div>
    </div>
  );
}
