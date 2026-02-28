import Image from "next/image";
import { SVGProps } from "react";
import StepIndicator from "./steps-underline";

export const STEPS = [
  {
    image: "/snake-1.png",
    title: "Add image",
    description: "Choose an image for your case",
    pathname: "/config/upload",
  },
  {
    image: "/snake-2.png",
    title: "Customize design",
    description: "Make the case yours",
    pathname: "/config/design",
  },
  {
    image: "/snake-3.png",
    title: "Summary",
    description: "Review your final design",
    pathname: "/config/review",
  },
];

export default function Steps() {
  return (
    <section>
      <div className="flex flex-row border border-t-0 border-gray-300 lg:flex-col">
        <div className="order-2 flex flex-auto flex-col lg:order-1 lg:flex-row">
          {STEPS.map((s, index) => {
            return (
              <div key={index} className="relative flex flex-1 basis-auto bg-white">
                <div className="relative flex flex-1 items-center gap-4 px-6 py-3.5">
                  <Image
                    width={50}
                    height={80}
                    className="size-20 object-contain"
                    src={s.image}
                    alt={`snake${index + 1}`}
                  />
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold text-zinc-700">
                      Step {index + 1}: {s.title}
                    </p>
                    <p className="font-semibold text-zinc-500">{s.description}</p>
                  </div>
                  <StepIndicator index={index} stepPathname={s.pathname} />
                </div>
                {index !== 0 && (
                  <Separator className="absolute left-0 hidden h-full w-3 text-gray-300 lg:block" />
                )}
              </div>
            );
          })}
        </div>
        <div className="order-1 h-full w-1 bg-zinc-400 lg:order-2 lg:h-1 lg:w-full" />
      </div>
    </section>
  );
}

const Separator = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 12 82" fill="none" preserveAspectRatio="none" {...props}>
    <path
      d="M0.5 0V31L10.5 41L0.5 51V82"
      stroke="currentcolor"
      vectorEffect="non-scaling-stroke"
    ></path>
  </svg>
);
