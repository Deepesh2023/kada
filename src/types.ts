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

export interface SellingProcduct {
  productName: string;
  quantity: number;
  price: number;
}

export interface NewSellingProductFormPropsType {
  addSellingProduct: (sellingProduct: SellingProcduct) => void;
}
