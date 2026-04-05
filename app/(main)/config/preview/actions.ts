"use server";

import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import { ImageConfiguration, TImageConfig } from "@/models/ImageConfig";
import { Order, TOrder } from "@/models/OrderDetails";
import { BASE_PRICE } from "@/validators/option-validator";
import { PRODUCTS_PRICE } from "@/validators/prices";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getCheckoutSession = async (configId: string) => {
  console.log(configId);
  await connectDB();
  const config = await ImageConfiguration.findById(configId).lean<TImageConfig>();

  if (!config) throw new Error("No such configuraiton was found.");
  const data = await auth.api.getSession({ headers: await headers() });
  if (!data?.user) throw new Error("You need to be logged in.");

  //u should calculate and use stripe in {{server side}} not client side, because someone can change data that is
  //sent to stripe which can help them make the price falsy
  const amount =
    BASE_PRICE +
    PRODUCTS_PRICE.material[config.options!.material] +
    PRODUCTS_PRICE.finish[config.options!.finish];
  let order: TOrder | undefined = undefined;
  const existingOrder = await Order.findOne({
    configurationId: configId,
    userId: data.user.id,
  }).lean<TOrder>();

  if (existingOrder) order = existingOrder;
  else
    order = (
      await Order.create({
        amount: amount,
        userId: data.user.id,
        configurationId: configId,
      })
    ).toObject() as TOrder;

  if (!order) throw new Error("Could not create order.");

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [config.imageUrl],
    default_price_data: { currency: "USD", unit_amount: amount },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.STRIPE_BASE_URL}/thank-you?orderId=${order._id!.toString()}`,
    cancel_url: `${process.env.STRIPE_BASE_URL}/config?preview=${configId}`,
    payment_method_types: ["card", "paypal"],
    mode: "payment",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["EG", "DE", "US", "OM", "GB", "SA", "AE", "QA"], //what county u allow service to
    },
    phone_number_collection: {
      enabled: true, // Stripe will now place this under the Shipping section
    },

    metadata: {
      userId: data.user.id,
      orderId: order._id!.toString(),
    }, //for web hook from stripe, what stripe confirmed payment for (which user, and what did he buy)
    line_items: [{ price: product.default_price as string, quantity: 1 }], //you tell stripe what users actually buying
  });
  if (!stripeSession.url)
    throw new Error("Something wrong happend from our end, please try again.");
  redirect(stripeSession.url as string);
};
