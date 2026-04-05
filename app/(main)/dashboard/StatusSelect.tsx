"use client";
import { changeOrderStatus } from "./actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enum_ORDER_STATUS } from "./types";
import { useRef } from "react";

const StatusSelect = ({
  orderId,
  orderStatus,
}: {
  orderId: string;
  orderStatus: enum_ORDER_STATUS;
}) => {
  const bindedAction = changeOrderStatus.bind(null, orderId);
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form ref={formRef} action={bindedAction}>
      <Select
        name="orderStatus"
        defaultValue={orderStatus}
        onValueChange={() => formRef.current?.requestSubmit()}
      >
        <SelectTrigger className="w-50 focus:border-transparent! focus:ring-[1.5px]! focus:ring-green-700/70!">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position={"popper"}>
          <SelectGroup>
            {Object.keys(enum_ORDER_STATUS).map((m) => (
              <SelectItem key={m} value={m}>
                {m.replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  );
};

export default StatusSelect;
