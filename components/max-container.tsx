import { cn } from "@/lib/utils";
export default function MaxContainerWrap({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) {
  // max-w-7xl,mx-auto is good standard stay with it
  return (
    <div className={cn("mx-auto h-full max-w-7xl px-2.5 md:mx-20 xl:px-30", classname)}>
      {children}
    </div>
  );
}
