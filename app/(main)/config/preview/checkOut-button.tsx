"use client";

import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/customButton";
import { useState } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useFormStatus } from "react-dom";

const ModalContent = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1.5 text-3xl font-bold">
        <Image src="/snake-1.png" alt="snake-logo" width={80} height={80} />
        Log in to continue
      </div>
      <p className="text-muted-foreground mt-1.5 py-2 text-center text-base font-medium">
        <span className="inline-block text-zinc-900">Your configuration was saved!</span> Please
        login or create an account to complete your purchase.
      </p>
      <div className="mt-2 flex gap-5">
        <Button
          onClick={() => router.push("/sign-in")}
          variant="outline"
          className="flex-1 bg-gray-100 hover:bg-gray-300/70"
        >
          Login
        </Button>
        <Button
          onClick={() => router.push("/sign-up")}
          className="flex-1 bg-green-700 hover:bg-green-700/90"
        >
          Sign up
        </Button>
      </div>
    </>
  );
};

export default function CheckOutBtn({ configId }: { configId: string }) {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();
  const { data } = useSession();
  const isDesktop = useMediaQuery({ minWidth: 640 });

  const saveConfigIdToStorage = () => {
    if (!data) localStorage.setItem("configId", configId);
  };

  const trigger = (
    <CustomButton
      text="Check out"
      iconPosition="end"
      type={data?.user ? "submit" : "button"}
      icon={<ArrowRight className="size-5 shrink-0 text-white" />}
      onClick={() => {
        saveConfigIdToStorage();
        setOpen(true);
      }}
      loading={pending ? <Loader2 className="animate-spin" /> : null}
    />
  );

  if (data) return trigger; //return only the trigger so that the Dialog or Drawer wont work

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <div>
                <ModalContent />
              </div>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {trigger}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="px-6 pt-6 pb-2 text-left">
            <DrawerTitle className="sr-only">Log in to continue</DrawerTitle>
            <DrawerDescription className="sr-only">
              Login or sign up to complete your purchase
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-8">
            <ModalContent />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
