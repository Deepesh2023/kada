import { createEffect, createSignal, Show } from "solid-js";
import "./salesService.css";

export default function SalesService() {
  const [showNewSaleDialog, setShowNewSaleDialog] = createSignal(false);
  const [showNewServiceDialog, setShowNewServiceDialog] = createSignal(false);

  return (
    <div class="sales-service-page">
      <NewSaleDialogBox showNewSaleDialog={showNewSaleDialog} />

      <AddNewButtonStack
        setShowNewSaleDialog={setShowNewSaleDialog}
        setShowNewServiceDialog={setShowNewServiceDialog}
      />
    </div>
  );
}

function AddNewButtonStack({ setShowNewSaleDialog, setShowNewServiceDialog }) {
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    createSignal<boolean>(false);

  return (
    <div class="add-new-button-stack">
      <Show when={isAddNewButtonClicked()}>
        <button onclick={() => setShowNewSaleDialog(true)}>Sale</button>
        <button onclick={() => setShowNewSaleDialog(true)}>Service</button>
      </Show>
      <button
        onclick={() => setIsAddNewButtonClicked(!isAddNewButtonClicked())}
      >
        {isAddNewButtonClicked() ? "close" : "Add"}
      </button>
    </div>
  );
}

function NewSaleDialogBox({ showNewSaleDialog }) {
  let dialog;

  createEffect(() => {
    if (showNewSaleDialog() && dialog) {
      dialog.showModal();
    }
  });

  return <dialog ref={dialog}>hello</dialog>;
}

function NewServieDialogBox({ showNewServiceDialog }) {
  return <dialog>hello</dialog>;
}
