import { createStore } from "solid-js/store";
import { SellingProduct } from "../types";

export const initialSellingProductForm = {
  serial: "",
  name: "",
  price: 0,
  quantity: 1,
};

export const intialAdditionalSaleDetails = {
  customerName: "",
  remarks: "",
  doNotRecord: false,
};

export function getNewSaleSessionStore() {
  const [newSaleSession, setNewSaleSession] = createStore({
    sellingProductForm: { ...initialSellingProductForm },
    sellingProducts: new Array<SellingProduct>(),
    additionalSaleDetails: { ...intialAdditionalSaleDetails },
  });

  return { newSaleSession, setNewSaleSession };
}
