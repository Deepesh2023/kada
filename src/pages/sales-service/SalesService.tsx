import { createEffect, createSignal, Show } from "solid-js";
import "./salesService.css";
import { Accessor, Setter } from "solid-js/types/server/reactive.js";

export default function SalesService() {
  const [showNewSaleDialog, setShowNewSaleDialog] = createSignal(false);
  const [showNewServiceDialog, setShowNewServiceDialog] = createSignal(false);

  return (
    <div class="sales-service-page">
      <NewSaleDialogBox
        showNewSaleDialog={showNewSaleDialog}
        setShowNewSaleDialog={setShowNewSaleDialog}
      />

      <NewServieDialogBox
        showNewServiceDialog={showNewServiceDialog}
        setShowNewServiceDialog={setShowNewServiceDialog}
      />

      <AddNewButtonStack
        setShowNewSaleDialog={setShowNewSaleDialog}
        setShowNewServiceDialog={setShowNewServiceDialog}
      />
    </div>
  );
}

function AddNewButtonStack({
  setShowNewSaleDialog,
  setShowNewServiceDialog,
}: {
  setShowNewSaleDialog: Setter<boolean>;
  setShowNewServiceDialog: Setter<boolean>;
}) {
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    createSignal<boolean>(false);

  return (
    <div class="add-new-button-stack">
      <Show when={isAddNewButtonClicked()}>
        <button onclick={() => setShowNewSaleDialog(true)}>Sale</button>
        <button onclick={() => setShowNewServiceDialog(true)}>Service</button>
      </Show>
      <button
        onclick={() => setIsAddNewButtonClicked(!isAddNewButtonClicked())}
      >
        {isAddNewButtonClicked() ? "close" : "Add"}
      </button>
    </div>
  );
}

function NewSaleDialogBox({
  showNewSaleDialog,
  setShowNewSaleDialog,
}: {
  showNewSaleDialog: Accessor<boolean>;
  setShowNewSaleDialog: Setter<boolean>;
}) {
  let dialog: HTMLDialogElement | undefined;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && showNewSaleDialog()) {
      setShowNewSaleDialog(false);
    }
  });

  createEffect(() => {
    if (showNewSaleDialog() && dialog) {
      dialog.showModal();
    }
  });

  return <dialog ref={dialog}>hello</dialog>;
}

function NewServieDialogBox({
  showNewServiceDialog,
  setShowNewServiceDialog,
}: {
  showNewServiceDialog: Accessor<boolean>;
  setShowNewServiceDialog: Setter<boolean>;
}) {
  let dialog: HTMLDialogElement | undefined;

  document.addEventListener("keydown", (e) => {
    if (
      (e.key === "Escape" && showNewServiceDialog()) ||
      showNewServiceDialog()
    ) {
      setShowNewServiceDialog(false);
    }
  });

  createEffect(() => {
    if (showNewServiceDialog() && dialog) {
      dialog.showModal();
    }
  });

  return <dialog ref={dialog}>hello</dialog>;
}
