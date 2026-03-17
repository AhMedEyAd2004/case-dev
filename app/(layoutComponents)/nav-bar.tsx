import { ArrowRight } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import MaxContainerWrap from "../../components/max-container";
import NavObserver from "./navObserver";
import Link from "next/link";
import CustomButton from "../../components/customButton";
import NavbarTabs from "./navbarTabs";

export default async function Navbar() {
  // w-screen can cause horizontal scroll issues because it ignores scrollbar width.
  return (
    <NavObserver className="font-recursive fixed top-0 z-99 h-14 w-full border-b bg-white/70 py-3 backdrop-blur-lg">
      <MaxContainerWrap className="flex w-full items-center justify-between border-gray-200 px-2.5 md:mx-auto xl:px-30">
        <h1 className="font-semibold">
          Case<span className="text-green-600">Cobra</span>
        </h1>
        <div className="flex items-center justify-center gap-4">
          <NavbarTabs />
          <div className="hidden h-8 sm:block">
            <Separator orientation="vertical" className="rounded-full border-[0.1px]" />
          </div>
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
        </div>
      </MaxContainerWrap>
    </NavObserver>
  );
}
