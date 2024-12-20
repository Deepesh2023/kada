import { Accessor, Setter, JSX } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

export interface DialogBoxTypes {
  isDialogVisible: Accessor<boolean>;
  setDialogVisiblity: Setter<boolean>;
  children: JSX.Element;
}

export interface AddNewButtonStackTypes {
  setAddNewSaleClicked: Setter<boolean>;
  setAddNewServiceClicked: Setter<boolean>;
}

export interface NavLinkType {
  name: string;
  link: string;
}

export interface NavLinkPropType {
  setMenuVisibility: null | Setter<boolean>;
}

export interface ProductOnStock {
  name: string;
  serial: string;
  mrp: number;
  stocks: number;
}

export interface SellingProduct {
  serial: string;
  name: string;
  quantity: number;
  price: number;
}

export interface newSaleFormType {
  productName: string;
  price: number;
  quantity: number;
  customerName: string;
  remarks: string;
  doNotRecord: boolean;
}

interface AdditionalSaleDetailsType {
  customerName: string;
  remarks: string;
  doNotRecord: boolean;
}

export interface NewSaleSessionStoreType {
  sellingProductForm: SellingProduct;
  sellingProducts: SellingProduct[];
  additionalSaleDetails: AdditionalSaleDetailsType;
}

export interface NewSaleSessionStoreContext {
  newSaleSession: NewSaleSessionStoreType;
  setNewSaleSession: SetStoreFunction<NewSaleSessionStoreType>;
}
