import { Accessor, Setter, JSX } from "solid-js";

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

export interface Product {
  name: string;
  serial: string;
  mrp: number;
  quantity: number;
  price: number;
}

export interface NewSellingProductFormPropsType {
  addSellingProduct: (sellingProduct: Product) => void;
}

export interface newSaleFormType {
  productName: string;
  price: number;
  quantity: number;
  customerName: string;
  remarks: string;
  doNotRecord: boolean;
}
