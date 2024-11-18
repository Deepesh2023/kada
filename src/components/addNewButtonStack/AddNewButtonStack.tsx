import { createSignal, createEffect, Show, onCleanup } from "solid-js";

import { AddNewButtonStackTypes } from "../../types";
import "./addNewButtonStack.css";

export default function AddNewButtonStack(props: AddNewButtonStackTypes) {
  const [isAddNewButtonClicked, setAddNewButtonClicked] =
    createSignal<boolean>(false);

  let addNewButton: undefined | HTMLButtonElement;

  function closeAddNewButton(e: MouseEvent) {
    if (e.target != addNewButton) {
      setAddNewButtonClicked(false);
    }
  }

  createEffect(() => {
    if (isAddNewButtonClicked()) {
      document.addEventListener("click", closeAddNewButton);
    }

    onCleanup(() => document.removeEventListener("click", closeAddNewButton));
  });

  return (
    <div class="add-new-button-stack">
      <Show when={isAddNewButtonClicked()}>
        <button onclick={() => props.setAddNewSaleClicked(true)}>Sale</button>
        <button onClick={() => props.setAddNewServiceClicked(true)}>
          Service
        </button>
      </Show>
      <button
        class="add-new-button"
        ref={(el) => (addNewButton = el)}
        onclick={() => setAddNewButtonClicked(!isAddNewButtonClicked())}
      >
        {isAddNewButtonClicked() ? "close" : "Add"}
      </button>
    </div>
  );
}
