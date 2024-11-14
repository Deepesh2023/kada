import { children, createSignal, JSX, Show } from "solid-js";
import "./salesService.css";

export default function SalesService() {
  return (
    <div class="sales-service-page">
      <AddNewButtonStack />
    </div>
  );
}

function AddNewButtonStack() {
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    createSignal<boolean>(false);

  return (
    <div class="add-new-button-stack">
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

function DialogBox(props: { children: JSX.Element }) {
  let dialog: HTMLDialogElement | undefined;

  const form = children(() => props.children);

  return <dialog ref={(el) => (dialog = el)}>{form()}</dialog>;
}
