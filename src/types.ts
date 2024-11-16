import { Accessor, Setter, JSX } from "solid-js";

export interface DialogBoxTypes {
  isDialogVisible: Accessor<boolean>;
  setDialogVisiblity: Setter<boolean>;
  children: JSX.Element;
}

export interface AddNewButtonStackTypes {
  addNewSaleClicked: Accessor<boolean>;
  setAddNewSaleClicked: Setter<boolean>;
  addNewServiceClicked: Accessor<boolean>;
  setAddNewServiceClicked: Setter<boolean>;
}

export interface NavbarItems {
  name: string;
  link: string;
}
