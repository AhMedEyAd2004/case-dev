import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import MaxContainerWrap from "./max-container";

export default function Navbar() {
  // w-screen can cause horizontal scroll issues because it ignores scrollbar width.
  return (
    <></>
    // <nav className="font-recursive sticky top-0 z-99 h-14 border-b py-3 backdrop-blur-lg">
    //   <MaxContainerWrap classname="flex w-full items-center justify-between px-2.5 xl:px-30 border-gray-200">
    //     <h1 className="font-semibold">
    //       Case<span className="text-green-600">Cobra</span>
    //     </h1>
    //     <div className="flex items-center justify-center gap-4">
    //       <ul className="flex gap-4 text-xs">
    //         <li className="px-3">Sign up</li>
    //         <li className="px-3">Login</li>
    //       </ul>
    //       <div className="hidden h-8 sm:block">
    //         <Separator orientation="vertical" className="rounded-full border-[0.1px]" />
    //       </div>
    //       <Button className="hidden h-8 items-center justify-center gap-3 bg-green-600 text-xs text-white hover:bg-green-600/90 sm:flex">
    //         <span className="text-center leading-[100%]">Create case</span>{" "}
    //         <ArrowRight className="size-5" />
    //       </Button>
    //     </div>
    //   </MaxContainerWrap>
    // </nav>
  );
}
