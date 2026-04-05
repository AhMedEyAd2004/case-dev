import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, formatPrice } from "@/lib/utils";
import { FINISH, MATERIALS } from "@/validators/option-validator";
import { PRODUCTS_PRICE } from "@/validators/prices";

type ProductAddonKey = keyof (typeof PRODUCTS_PRICE)[keyof typeof PRODUCTS_PRICE];

export function RadioGroupChoiceCard({
  name,
  options,
  className,
  setPrice,
}: {
  name: (typeof MATERIALS | typeof FINISH)["name"];
  options: (typeof MATERIALS | typeof FINISH)["options"];
  setPrice: (val: ProductAddonKey) => void;
  className?: string;
}) {
  return (
    <RadioGroup
      onValueChange={(val) => setPrice(val as ProductAddonKey)}
      name={name}
      defaultValue={options[0].value}
      className={cn("max-w-sm", className)}
    >
      {options.map((c, index) => (
        <FieldLabel
          key={index}
          htmlFor={c.label}
          className="border-2! has-data-[state=checked]:border-green-700/70 has-data-[state=checked]:bg-green-500/5"
        >
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{c.label}</FieldTitle>
              {c.description && <FieldDescription>{c.description}</FieldDescription>}
            </FieldContent>
            <p>{formatPrice(c.price / 100)}</p>
            <RadioGroupItem value={c.value} id={c.label} className="hidden" />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
