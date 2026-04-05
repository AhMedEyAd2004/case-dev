// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950

import { PRODUCTS_PRICE } from "./prices";

export const CASE_COLORS = {
  name: "caseColor",
  options: [
    {
      value: "black",
      tw: "zinc-900",
    },
    {
      value: "blue",
      tw: "blue-950",
    },
    {
      value: "rose",
      tw: "rose-950",
    },
  ],
} as const;

export const MODELS = {
  name: "model",
  options: [
    {
      label: "iPhone X",
      value: "iPhoneX",
    },
    {
      label: "iPhone 11",
      value: "iPhone11",
    },
    {
      label: "iPhone 12",
      value: "iPhone12",
    },
    {
      label: "iPhone 13",
      value: "iPhone13",
    },
    {
      label: "iPhone 14",
      value: "iPhone14",
    },
    {
      label: "iPhone 15",
      value: "iPhone15",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicon",
      value: "silicon",
      description: undefined,
      price: PRODUCTS_PRICE.material.silicon,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCTS_PRICE.material.polycarbonate,
    },
  ],
} as const;

export const FINISH = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCTS_PRICE.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCTS_PRICE.finish.textured,
    },
  ],
} as const;

export const BASE_PRICE = 14_00;
