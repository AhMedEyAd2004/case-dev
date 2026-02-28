import { cn } from "@/lib/utils";
import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";
export default function MaxContainerWrap({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
  className?: string;
}) {
  // max-w-7xl,mx-auto is good standard stay with it
  return (
    <div className={cn("mx-auto h-full max-w-7xl px-2.5 xl:px-20", className)} {...props}>
      {children}
    </div>
  );
}
