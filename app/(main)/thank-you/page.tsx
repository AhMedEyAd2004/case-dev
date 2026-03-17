import React from "react";

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  //loading ur order, this wont take long
  //then the order
  //once user paid ,stripe sends webhook
  //webhook => stripe sending a request to our api, bu giving it url of the api
  //
  return <div className="flex bg-red-500">ThankYou</div>;
}
