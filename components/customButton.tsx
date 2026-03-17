import { Button } from "./ui/button";
import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function CustomButton({
  text,
  icon,
  iconPosition = "end",
  loading,
  className,
  ...props
}: ComponentProps<typeof Button> & {
  text: string;
  loading?: ReactNode;
  icon?: ReactNode;
  className?: string;
  iconPosition?: "start" | "end";
}) {
  return (
    <Button
      {...props}
      className={cn(
        "-mt-4 flex h-10 items-center justify-center gap-3 rounded-md bg-green-600 px-8! text-sm font-medium text-white shadow hover:bg-green-600/90",
        className,
      )}
    >
      {!loading && icon && iconPosition === "start" && icon}
      <span className="text-center leading-[100%]">{loading ? loading : text}</span>
      {!loading && icon && iconPosition === "end" && icon}
    </Button>
  );
}
