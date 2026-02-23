import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { ComponentProps } from "react";

export default function StarsGroup({
  rating,
  className,
  ...props
}: { rating: number; className?: string } & ComponentProps<typeof Star>) {
  return (
    <div className="flex gap-0.75">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1); // 0, 0.5, or 1

        if (fill === 1) {
          return (
            <Star
              key={index}
              className={cn("size-4 fill-green-600 text-green-600", className)}
              {...props}
            />
          );
        }

        if (fill >= 0.5) {
          // Half star using a clip mask on an overlay
          return (
            <div key={index} className="relative size-fit">
              <Star className={cn("size-4 fill-none text-green-600", className)} {...props} />
              <div className="absolute inset-0 w-1/2 overflow-hidden">
                <Star
                  className={cn("size-4 fill-green-600 text-green-600", className)}
                  {...props}
                />
              </div>
            </div>
          );
        }

        return (
          <Star
            key={index}
            className={cn("size-4 fill-none text-green-600", className)}
            {...props}
          />
        );
      })}
    </div>
  );
}
