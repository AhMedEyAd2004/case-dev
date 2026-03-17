export const PRODUCTS_PRICE = {
  material: {
    silicon: 0,
    polycarbonate: 5_00, //means 500 cents, the _ is good way for formatting large numbers like 5,00
  },
  finish: {
    smooth: 0,
    textured: 3_00, //means 500 cents, the _ is good way for formatting large numbers like 5,00
  },
} as const;
