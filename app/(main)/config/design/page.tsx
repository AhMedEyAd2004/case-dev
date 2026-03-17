import { ImageConfiguration, TImageConfig } from "@/models/ImageConfig";
import Client_Design from "./client_Design";
import connectDB from "@/lib/mongodb";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ id: string }>;
};

export default async function DesignPage({ searchParams }: PageProps) {
  const id = (await searchParams).id;
  await connectDB();
  const config = (await ImageConfiguration.findById(id).lean()) as TImageConfig;
  if (!config) notFound();
  return (
    <section className="mt-3.75 mb-30 grid w-full auto-rows-[600px] grid-cols-1 max-md:px-5 lg:grid-cols-3">
      <Client_Design
        configId={id}
        width={config.width}
        height={config.height}
        imageUrl={config.imageUrl}
      />
    </section>
  );
}
