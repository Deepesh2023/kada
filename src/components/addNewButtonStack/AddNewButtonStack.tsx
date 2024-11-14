import { Accessor, Setter, createSignal, createEffect, Show } from "solid-js";

import "./addNewButtonStack.css";

export default function AddNewButtonStack(props: {
  addNewSaleClicked: Accessor<boolean>;
  setAddNewSaleClicked: Setter<boolean>;
  addNewServiceClicked: Accessor<boolean>;
  setAddNewServiceClicked: Setter<boolean>;
}) {
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    createSignal<boolean>(false);

  createEffect(() => {
    if (props.addNewSaleClicked() || props.addNewServiceClicked()) {
      setIsAddNewButtonClicked(false);
    }
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
        onclick={() => setIsAddNewButtonClicked(!isAddNewButtonClicked())}
      >
        {isAddNewButtonClicked() ? "close" : "Add"}
      </button>
    </div>
  );
}
