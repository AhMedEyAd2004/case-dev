"use client";

import CustomButton from "@/components/customButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavCreateBtn() {
  const pathname = usePathname();
  const router = useRouter();
  return pathname == "/home" ? (
    <div className="flex h-full items-center justify-center">
      <Link href={"/config/upload"}>
        <CustomButton
          className="mt-0 hidden h-8 px-4! text-xs sm:flex"
          text="Create case"
          iconPosition="end"
          icon={<ArrowRight className="size-5" />}
        />
      </Link>
    </div>
  ) : (
    <div className="flex h-full items-center justify-center">
      <CustomButton
        className="mt-0 hidden h-8 px-4! text-xs sm:flex"
        text="go Back"
        iconPosition="start"
        icon={<ArrowLeft className="size-5" />}
        onClick={() => router.back()}
      />
    </div>
  );
}
