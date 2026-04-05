import ThankYouClient from "./thankyouContent";

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  const { orderId } = await searchParams;
  return <ThankYouClient orderId={orderId} />;
}
