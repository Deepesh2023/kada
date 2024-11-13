import { createSignal, Show } from "solid-js";
import "./salesService.css";

export default function SalesService() {
  return (
    <div>
      <AddNewButtonStack />
    </div>
  );
}

function AddNewButtonStack() {
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    createSignal<boolean>(false);

  return (
    <div>
      <Show when={isAddNewButtonClicked()}>
        <button>Sale</button>
        <button>Service</button>
      </Show>
      <button
        onclick={() => setIsAddNewButtonClicked(!isAddNewButtonClicked())}
      >
        {isAddNewButtonClicked() ? "close" : "Add"}
      </button>
    </div>
  );
}
