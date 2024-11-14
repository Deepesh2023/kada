import { createEffect, children } from "solid-js";

import { DialogBoxTypes } from "../../types";
import "./dialogBox.css";

export default function DialogBox(props: DialogBoxTypes) {
  let dialog: HTMLDialogElement | undefined;
  const form = children(() => props.children);

  createEffect(() => {
    if (props.isDialogVisible()) {
      dialog?.showModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dialog?.close();
      props.setDialogVisiblity(false);
    }
  });

  return <dialog ref={(el) => (dialog = el)}>{form()}</dialog>;
}
