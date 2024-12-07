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
