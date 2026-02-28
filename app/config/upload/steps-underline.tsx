"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { STEPS } from "./steps";

export default function StepIndicator({
  stepPathname,
  index,
}: {
  stepPathname: string;
  index: number;
}) {
  const pathname = usePathname();

  const getStepsUpToCurrent = () => {
    const idx = STEPS.findIndex(
      (s) => pathname.endsWith(s.pathname) || (pathname.includes(s.pathname) && pathname !== "/"),
    );
    return [[...STEPS].slice(0, idx + 1), idx] as const;
  };

  const [stepsUpToCurrent, currentIndex] = getStepsUpToCurrent();
  const isActive = stepsUpToCurrent.some((step) => step.pathname === stepPathname);

  return (
    <div
      className={cn(
        "absolute inset-y-0 -left-1 w-1 origin-top bg-zinc-700 transition-transform duration-500 lg:inset-x-0 lg:top-auto lg:-bottom-1 lg:h-1 lg:w-full lg:origin-left",
        isActive ? "scale-y-100 lg:scale-x-100" : "scale-y-0 lg:scale-x-0",
        currentIndex === index ? "rounded-r-2xl" : "",
      )}
    />
  );
}
