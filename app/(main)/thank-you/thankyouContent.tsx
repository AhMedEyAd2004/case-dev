"use client";
import MaxContainerWrap from "@/components/max-container";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import clearPhone from "@/public/clearphone.png";
import { BASE_PRICE, CASE_COLORS } from "@/validators/option-validator";
import { SHIPPING_PRICE } from "@/validators/prices";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getPaymentStatus } from "./action";
//u do this because the webhook is not called before the thank u page its called
//with the thank u page and maybe delayed even more
// the web hook makes sure that the user paid using stripe and stripe request api (webhook)
//with its signature and if user paid then isPaid in db is true
//then return orderDetails from serverAction function and use it here
//if this is a client componetn do so, if this is server component u can do the logic here i guess its fine
//=========================================================================================
//not doing the above will allow the webhook to work after the thank you page which will cause an error because the databases
//are filled inside the webhook that we want to access here in the thank you page

/*Suspense — React primitive, works for both server and client. loading.tsx is literally just Next.js creating a Suspense boundary for you under the hood.
The actual rule is:
Suspense shows its fallback when a component inside it is "not ready yet"
What "not ready" means depends on context:

Server → component is awaiting data
Client → component is using useSearchParams, lazy loaded with React.lazy(), or using a library that suspends (like React Query's suspense mode) */

export default function ThankYouClient({ orderId }: { orderId: string }) {
  console.log(orderId);

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retryDelay: 500,
    retry: 7,
  });

  /* data:
  undefined → still loading
  false → order exists but not paid yet
  order object → paid ✅*/

  if (isLoading || orderDetails === false) {
    return (
      <div className="flex w-full flex-col items-center justify-center pt-20">
        <Loader2 className="animate-spin text-green-600" />
        <p>Verifying your payment...</p>
      </div>
    );
  }
  const subtotal = orderDetails?.amount ?? BASE_PRICE;
  const total = subtotal + SHIPPING_PRICE;
  const bgColor = CASE_COLORS.options.find(
    (o) => o.value === orderDetails?.configurationId.options?.caseColor,
  )?.tw;

  console.log(orderDetails);

  //loading ur order, this wont take long
  //then the order
  //once user paid ,stripe sends webhook
  //webhook => stripe sending a request to our api, bu giving it url of the api

  if (orderDetails)
    return (
      <MaxContainerWrap className="py-16 pb-7 md:py-24">
        <section className="flex max-w-3xl flex-col px-1.5 md:mx-auto md:px-8">
          <div className="mb-12">
            <p className="font-semibold text-green-600">Thank you!</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-green-600/20">
              <div className="relative size-2 rounded-full">
                <div className="absolute top-1/2 left-1/2 size-2 -translate-1/2 animate-ping rounded-full bg-green-600" />
                <div className="absolute top-1/2 left-1/2 size-1.5 -translate-1/2 rounded-full bg-green-600" />
              </div>
              Order confirmed — Details have been sent to your email
            </div>
            <h4 className="my-2 text-4xl font-bold tracking-tight md:text-5xl">
              Your case is on the way!
            </h4>
            <p className="text-zinc-500">
              We&apos;ve received your order and are now processing it.
            </p>
          </div>

          <div className="mb-10 space-y-2 text-sm">
            <p>Order number</p>
            <p className="font-medium text-zinc-500">{orderId}</p>
          </div>

          <Separator className="bg-zinc-200" />

          <div className="mt-10 mb-4 flex flex-col gap-2">
            <p className="font-semibold">You made a great choice!</p>
            <p className="text-sm font-normal text-zinc-600">
              We at CaseCobra believe that a phone case doesn&apos;t only need to look good, but
              also last you for the years to come. We offer a 5-year print guarantee on all our
              cases. If your case isn&apos;t of the highest quality, we&apos;ll replace it for free.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-100">
            <Image
              width={160}
              height={322}
              src={orderDetails!.configurationId.croppedImageUrl!}
              alt="your modified Image"
              // w-[23%] is the percentage of the phone compared to the container and aspect to keep hold of the aspect ratio
              className={cn(
                `absolute top-1/2 left-1/2 z-30! aspect-160/322 w-[23%] -translate-x-[calc(50%-2px)] -translate-y-[52%]`,
                "rounded-[10%] rounded-t-[12%] md:rounded-[10.5%] md:rounded-b-[14%]",
                "transform-[rotateZ(-12deg)_perspective(800px)_rotateX(3deg)_rotateY(10deg)]",
                `bg-${bgColor}`,
              )}
            />

            <Image
              placeholder="blur"
              src={clearPhone}
              alt="your-new-case"
              className="pointer-events-none relative z-50! opacity-100 select-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 py-10">
            <div className="space-y-2 text-sm">
              <p>Shippping address</p>
              <div className="text-zinc-600">
                <p>{orderDetails?.shippingAddressId.name}</p>
                <p>{orderDetails?.shippingAddressId.address}</p>
                <p>
                  {orderDetails?.shippingAddressId.city}, {orderDetails?.shippingAddressId.country}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p>Billing address</p>
              <div className="text-zinc-600">
                <p>{orderDetails?.shippingAddressId.name}</p>
                <p>{orderDetails?.billingAddressId.address}</p>
                <p>
                  {orderDetails?.billingAddressId.city}, {orderDetails?.billingAddressId.country}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-200" />

          <div className="my-10 grid grid-cols-2 gap-6">
            <div className="space-y-2 text-sm">
              <p>Payment status</p>
              <p className="text-zinc-600">{orderDetails?.isPaid ? "Paid" : "Not paid"}</p>
            </div>

            <div className="space-y-2 text-sm">
              <p>Shipping method</p>
              <p className="text-zinc-600">DHL, takes up to 3 working days</p>
            </div>
          </div>

          <Separator className="bg-zinc-200" />

          <div className="my-10 space-y-6 text-sm font-medium">
            <div className="flex w-full justify-between text-black">
              <p>Subtotal</p>
              <p className="text-zinc-600">{formatPrice(subtotal / 100)}</p>
            </div>
            <div className="flex w-full justify-between text-black">
              <p>Shipping</p>
              <p className="text-zinc-600">{formatPrice(SHIPPING_PRICE / 100)}</p>
            </div>
            <div className="flex w-full justify-between text-black">
              <p>Total</p>
              <p className="text-zinc-600">{formatPrice(total / 100)}</p>
            </div>
          </div>
        </section>
      </MaxContainerWrap>
    );
}
