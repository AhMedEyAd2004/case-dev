import { Separator } from "@/components/ui/separator";
import connectDB from "@/lib/mongodb";
import { cn, formatPrice } from "@/lib/utils";
import { ImageConfiguration, TImageConfig } from "@/models/ImageConfig";
import { BASE_PRICE, CASE_COLORS, FINISH, MATERIALS, MODELS } from "@/validators/option-validator";
import { Check } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import CheckOutBtn from "./checkOut-button";
import { getCheckoutSession } from "./actions";
import ReactConfettiComp from "./react-confetti";

export default async function Preview({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const id = (await searchParams).id;
  await connectDB();
  const config = await ImageConfiguration.findById(id).lean<TImageConfig>();
  console.log(config);
  if (!config || !config.croppedImageUrl) notFound();

  const boundAction = getCheckoutSession.bind(null, id);

  const [materialPrice, finishPrice] = [
    MATERIALS.options.find((obj) => obj.value == config.options?.material)?.price,
    FINISH.options.find((obj) => obj.value == config.options?.finish)?.price,
  ];

  return (
    <section className="grid grid-cols-1 place-items-center gap-7 md:grid-cols-[auto_1fr]">
      <ReactConfettiComp
        className="w-full"
        confettiDuration_ms={1000} // spawn for 2.5s
        tweenDuration={3000} // pieces fall off naturally
        gravity={0.3} // faster fall
        height={736}
        initialVelocityX={2} // more horizontal spread
        initialVelocityY={10} // strong upward burst
        opacity={1}
        width={1220}
        wind={0}
      />
      <div className="relative aspect-896/1831 w-37.5 justify-self-center overflow-hidden rounded-3xl md:h-122 md:w-full md:rounded-[32px]">
        <Image
          src="/phone-template.png"
          alt="phone-case"
          fill
          className="pointer-events-none z-50 select-none md:rounded-[32px]"
        />
        {/* w-[calc()] for trimmming unwanted parts */}

        <div
          id="case-bg-color"
          className={cn(
            "absolute top-1/2 left-1/2 z-20 h-[calc(100%-2px)] w-full -translate-1/2 rounded-3xl md:h-120.75 md:w-[calc(100%-6px)] md:rounded-[32px]",
            `bg-${CASE_COLORS.options.find((c) => c.value === config.options?.caseColor)?.tw}`,
          )}
        />
        <Image
          fill
          src={config.croppedImageUrl}
          alt="your modified Image"
          className="z-30 mx-auto h-[calc(100%-2px)]! w-[calc(100%-6px)]! rounded-3xl md:h-120.75 md:rounded-[32px]"
        />
      </div>

      <div>
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-3xl font-bold">
            Your {MODELS.options.find((m) => m.value == config.options?.model)?.label} Case
          </h3>
          <p>
            <Check className="mr-2 inline-block size-4.5 text-green-500" />
            In stock and ready to ship
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-5 px-2.5">
          <div>
            <p className="mb-2 font-medium">Hightlights</p>
            <ul className="list-disc pl-5 text-zinc-700">
              <li>Wireless charging compatible</li>
              <li>TPU shock absorption</li>
              <li>Packaging made from recycled materials</li>
              <li>5 year print warranty</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-medium">Materials</p>
            <ul className="list-disc pl-5 text-zinc-700">
              <li>High-quality, durable material</li>
              <li>Scratch and fingerprint resistant coating</li>
            </ul>
          </div>
        </div>
        <Separator className="my-10 bg-gray-400/90" />
        <div className="space-y-4 rounded-xl bg-linear-to-br from-gray-200 to-gray-100 to-40% p-8 text-zinc-700 shadow-md">
          <div className="flex w-full justify-between">
            <p>Base price</p>
            <p>{formatPrice(BASE_PRICE / 100)}</p>
          </div>

          {[MATERIALS, FINISH].map((group) => {
            const selectedValue = config.options?.[group.name];

            const option = group.options.find((o) => o.value === selectedValue);

            if (!option) return null;

            return (
              <div key={group.name} className="flex w-full justify-between">
                <p className="capitalize">
                  {option.value} {group.name}
                </p>
                <p>{formatPrice(option.price / 100)}</p>
              </div>
            );
          })}

          <Separator />
          <div className="flex w-full justify-between text-black">
            <p>Order Total</p>
            <p>{formatPrice((BASE_PRICE + Number(materialPrice) + Number(finishPrice)) / 100)}</p>
          </div>
        </div>
        <form action={boundAction} className="my-8 flex w-full justify-end">
          <CheckOutBtn configId={id} />
        </form>
      </div>
    </section>
  );
}
