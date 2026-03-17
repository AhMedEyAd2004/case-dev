import { stripe } from "@/lib/stripe";
import { BillingAddress } from "@/models/BillingAddress";
import { Order } from "@/models/OrderDetails";
import { ShippingAddress } from "@/models/ShippingAddress";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    //raw body
    const body = await req.text();
    //check if the request is sent by stripe by checking its
    //  signature from the headers of the request
    //if not checked, anyone can call this api to get the case for free
    const signature = (await headers()).get("stripe-signature");

    if (!signature) return new NextResponse("Invalid signature", { status: 400 });

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    const session = event.data.object as Stripe.Checkout.Session;
    //if user paid the money
    //email is optional in stripe i want it
    if (event.type === "checkout.session.completed")
      if (!session.customer_details?.email) throw new Error("Missing user email");

    //the metadata passed in the action.ts in preview
    const { orderId, userId } = session.metadata!;

    if (!userId || orderId) throw new Error("Invalid request metadata");

    //to get the address input, in stripe page
    //customer might want to send the case to someone else
    const customerDetails = session.customer_details;
    const shippingDetails = session.collected_information?.shipping_details;

    const shipping = await ShippingAddress.create({
      name: shippingDetails!.name,
      address: [shippingDetails?.address?.line1, shippingDetails?.address?.line2]
        .filter(Boolean)
        .join("__--__"),
      city: shippingDetails!.address.city,
      country: shippingDetails!.address.country,
      phone: customerDetails?.phone,
    });

    const billing = await BillingAddress.create({
      city: customerDetails?.address?.city,
      country: customerDetails?.address?.country,
      address: [customerDetails?.address?.line1, customerDetails?.address?.line2]
        .filter(Boolean)
        .join("__--__"),
    });

    await Order.findByIdAndUpdate(orderId, {
      $set: {
        isPaid: true,
        shippingAddressId: shipping._id.toString(),
        billingAddressId: billing._id.toString(),
      },
    });
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 });
  }
}
