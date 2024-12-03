import { ProductOnStock } from "../types";

const productsOnStock: ProductOnStock[] = [
  {
    serial: "torch123",
    name: "Torch",
    stocks: 10,
    mrp: 100,
  },

  {
    serial: "battery123",
    name: "Battery",
    stocks: 50,
    mrp: 20,
  },

  {
    serial: "tv-remote-123",
    name: "TV remote",
    stocks: 20,
    mrp: 80,
  },
];

export function getAllProductsOnStock(): ProductOnStock[] {
  return productsOnStock;
}
