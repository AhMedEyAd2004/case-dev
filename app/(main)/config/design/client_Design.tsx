"use client";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroupChoiceCard } from "./radio-field";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { InputHTMLAttributes, SubmitEvent, useRef, useState, useTransition } from "react";
import { TImageConfig } from "@/models/ImageConfig";
import { Rnd } from "react-rnd";
import { BASE_PRICE, CASE_COLORS, FINISH, MATERIALS, MODELS } from "@/validators/option-validator";
import { PRODUCTS_PRICE } from "@/validators/productPrice";
import { toast } from "sonner";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

// Extracted the shape into a type so we can pass it around without repeating ourselves
type ImageProps = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const SCALE = 4;
export default function Client_Design({
  configId,
  width,
  height,
  imageUrl,
}: TImageConfig & { configId: string }) {
  const [caseColor, setCaseColor] = useState<(typeof CASE_COLORS.options)[number]>(
    CASE_COLORS.options[0],
  );
  const [addons, setAddons] = useState({
    material: MATERIALS.options[0].price,
    finish: FINISH.options[0].price,
  });

  const [imageTransform, setImageTransform] = useState<ImageProps>({
    width: width / SCALE,
    height: height / SCALE,
    x: 50,
    y: 120,
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const { configId } = data.serverData;
      startTransition(() => {
        router.push(`/config/preview?id=${configId}`);
      });
    },
    onUploadError: () => {
      toast.error("Error while uploading, please try again", {
        classNames: {
          toast: "bg-red-800! text-white!",
          description: "text-red-300!",
        },
      });
    },
  });

  const phoneRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isImageOutOfBounds = (
    containerDimensions: { width: number; height: number },
    imageProps: ImageProps, // ✅ fresh values passed in directly
  ) => {
    return (
      imageProps.x + imageProps.width < 0 ||
      imageProps.y + imageProps.height < 0 ||
      imageProps.x > containerDimensions.width ||
      imageProps.y > containerDimensions.height
    );
  };

  function getImagePropsAfterCrop(e: SubmitEvent<HTMLFormElement>, imageProps: ImageProps) {
    if (!phoneRef.current || !containerRef.current) return;

    const phone = phoneRef.current.getBoundingClientRect();

    if (isImageOutOfBounds({ width: phone.width, height: phone.height }, imageProps)) {
      toast.error("Image out of bounds", { richColors: true });
      return;
    }

    cropImage(new FormData(e.currentTarget), {
      phoneWidth: phone.width,
      phoneHeight: phone.height,
      imageProps,
    });
  }

  async function cropImage(
    formData: FormData,
    {
      phoneWidth,
      phoneHeight,
      imageProps,
    }: {
      phoneWidth: number;
      phoneHeight: number;
      imageProps: ImageProps;
    },
  ) {
    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl!;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = phoneWidth;
      canvas.height = phoneHeight;

      const ctx = canvas.getContext("2d")!;

      // paint the full original image and what overflows the canvas will be cut,
      //  so no need for big calculations
      //width changes on resize so no need to scale
      ctx.drawImage(
        img, // the image element
        0, // sx — start reading from x=0 (left edge)
        0, // sy — start reading from y=0 (top edge)
        img.naturalWidth, // sWidth — read the FULL width
        img.naturalHeight, // sHeight — read the FULL height
        Math.round(imageProps.x), // dx — paint starting at this x on canvas
        Math.round(imageProps.y), // dy — paint starting at this y on canvas
        Math.round(imageProps.width), // dWidth — paint it this wide
        Math.round(imageProps.height), // dHeight — paint it this tall
      );

      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
          "image/png",
        ),
      );

      type TOptions = NonNullable<TImageConfig["options"]>;
      const options: TOptions = {
        caseColor: formData.get("caseColor") as TOptions["caseColor"],
        model: formData.get("model") as TOptions["model"],
        material: formData.get("material") as TOptions["material"],
        finish: formData.get("finish") as TOptions["finish"],
      };

      const file = new File([blob], "cropped-case.png", { type: "image/png" });
      const res = await startUpload([file], {
        configId,
        options: options,
      });
      return res?.[0]?.ufsUrl;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong", {
        description: "There was a problem saving your ImageConfiguration, please try again.",
        richColors: true,
      });
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 lg:col-span-2"
      >
        <div ref={phoneRef} className="relative aspect-896/1831 h-122 rounded-[32px]">
          <Image
            src="/phone-template.png"
            alt="phone-case"
            fill
            className="pointer-events-none z-50 rounded-[32px] select-none"
          />
          {/* w-[calc()] for trimmming unwanted parts */}
          <div
            id="outside-case-shadow"
            className="pointer-events-none absolute top-1/2 left-1/2 z-40 h-120.75 w-[calc(100%-8px)] -translate-1/2 rounded-[32px] shadow-[0_0_0_9999px_rgba(229,231,235,0.6)]"
          />
          <div
            id="case-bg-color"
            className={cn(
              "absolute top-1/2 left-1/2 z-20 h-120.75 w-[calc(100%-8px)] -translate-1/2 rounded-[32px]",
              `bg-${caseColor.tw}`,
            )}
          />
          <Rnd
            default={{ ...imageTransform }}
            onDragStop={(_, { x, y }) => {
              const newProps: ImageProps = { ...imageTransform, x, y };
              setImageTransform(newProps);
            }}
            onResizeStop={(_, __, ref, ___, { x, y }) => {
              const newProps: ImageProps = {
                // "50px"=>50
                height: Number(ref.style.height.slice(0, -2)),
                width: Number(ref.style.width.slice(0, -2)),
                x,
                y,
              };
              setImageTransform(newProps);
            }}
            resizeHandleComponent={{
              topLeft: <div className="size-4 rounded-full bg-white ring-4 ring-green-500" />,
              topRight: <div className="size-4 rounded-full bg-white ring-4 ring-green-500" />,
              bottomLeft: <div className="size-4 rounded-full bg-white ring-4 ring-green-500" />,
              bottomRight: <div className="size-4 rounded-full bg-white ring-4 ring-green-500" />,
            }}
            lockAspectRatio={true}
            className="relative z-30"
          >
            <Image
              className="pointer-events-none ring-4 ring-green-700/70"
              src={imageUrl!}
              alt="desired-image-for-case"
              fill
              draggable={false}
            />
          </Rnd>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getImagePropsAfterCrop(e, imageTransform);
        }}
        className="scrollable-parent! relative h-full bg-white"
      >
        {/* the item that needs the scroll must have a "defined height" or inherit a defined height from parent
          if i did normal h-150 to the grid and the child gets h-full, it should work normally,
          but since the grid is using auto rows auto height, 
          the child with h-full will not know what to inherit and will just be as high as its content, so it will not scroll, 
           we fix this by (auto-rows-[600px]) which means all rows in the grid will be 600px height */}
        <div className="h-full p-8 pr-7 pb-30">
          <h2 className="text-3xl font-bold lg:text-center">Customize your case</h2>
          <Separator className="my-6" />
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Color : {caseColor.value}</p>
              <div role="radiogroup" className="flex gap-3">
                {CASE_COLORS.options.map((color, index) => (
                  <RadioBtn
                    key={index}
                    name={CASE_COLORS.name}
                    onClick={() => setCaseColor({ ...color })}
                    color={color.value}
                    defaultChecked={caseColor === color}
                    className={cn(`bg-${color.tw}`)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold capitalize">{MODELS.name}</p>
              <Select name={MODELS.name} defaultValue={MODELS.options.at(-1)?.value}>
                <SelectTrigger className="w-full focus:border-transparent! focus:ring-[1.5px]! focus:ring-green-700/70!">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position={"popper"}>
                  <SelectGroup>
                    {MODELS.options.map((m) => (
                      <SelectItem key={m.label} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* {x1:x2} im renaming x1 var to x2 var  */}
            {[MATERIALS, FINISH].map(({ name, options: selectableOptions }) => (
              <div key={name} className="space-y-3">
                <p className="text-sm font-semibold capitalize">{name}</p>
                <RadioGroupChoiceCard
                  setPrice={(val) => {
                    setAddons((prev) => ({ ...prev, [name]: PRODUCTS_PRICE[name][val] }));
                  }}
                  name={name}
                  className="max-w-full"
                  options={selectableOptions}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-16 h-10 w-full bg-white mask-[linear-gradient(to_top,white,transparent)]" />

        <div className="absolute bottom-0 w-full bg-white px-8">
          <Separator />
          <div className="flex flex-nowrap items-center justify-center gap-6 py-4">
            <p>{formatPrice(BASE_PRICE + Number(addons.finish) + Number(addons.material) / 100)}</p>
            <Button
              disabled={isUploading || isPending}
              className="h-8 flex-1 items-center justify-center gap-3 bg-green-600 text-xs text-white hover:bg-green-600/90 sm:flex"
            >
              <div className="flex items-center justify-center gap-3 text-center leading-[100%]">
                {isUploading ? (
                  <>
                    <div className="flex items-center justify-center gap-1">
                      <p className="pr-2">Saving</p>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className={`size-1 animate-bounce rounded-full bg-white duration-200 delay-[${i * 300}]`}
                        />
                      ))}
                    </div>
                  </>
                ) : isPending ? (
                  <>
                    <p>Redirecting, please wait...</p>
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="size-5" />
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

const RadioBtn = ({
  color,
  className,
  ...props
}: { color: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) => (
  <label
    aria-label={color}
    htmlFor={color}
    className="flex size-10 items-center justify-center rounded-full bg-white ring-3 ring-gray-200 has-checked:ring-green-800"
  >
    <input
      id={color}
      type="radio"
      value={color}
      {...props}
      className={cn(`size-8 cursor-pointer appearance-none rounded-full`, className)}
    />
  </label>
);
