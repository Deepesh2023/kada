import {
  Accessor,
  Setter,
  children,
  createSignal,
  JSX,
  Show,
  createEffect,
} from "solid-js";

import "./salesService.css";

export default function SalesService() {
  const [addNewSaleClicked, setAddNewSaleClicked] = createSignal(false);
  const [addNewServiceClicked, setAddNewServiceClicked] = createSignal(false);

  return (
    <div class="sales-service-page">
      <DialogBox
        isDialogVisible={addNewSaleClicked}
        setDialogVisiblity={setAddNewSaleClicked}
      >
        <h1>Sale</h1>
      </DialogBox>

      <DialogBox
        isDialogVisible={addNewServiceClicked}
        setDialogVisiblity={setAddNewServiceClicked}
      >
        <h1>Service</h1>
      </DialogBox>

      <AddNewButtonStack
        addNewSaleClicked={addNewSaleClicked}
        setAddNewSaleClicked={setAddNewSaleClicked}
        addNewServiceClicked={addNewServiceClicked}
        setAddNewServiceClicked={setAddNewServiceClicked}
      />
    </div>
  );
}

function AddNewButtonStack(props: {
  addNewSaleClicked: Accessor<boolean>;
  setAddNewSaleClicked: Setter<boolean>;
  addNewServiceClicked: Accessor<boolean>;
  setAddNewServiceClicked: Setter<boolean>;
}) {
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    createSignal<boolean>(false);

  createEffect(() => {
    if (props.addNewSaleClicked() || props.addNewServiceClicked()) {
      console.log("hello");
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

function DialogBox(props: {
  isDialogVisible: Accessor<boolean>;
  setDialogVisiblity: Setter<boolean>;
  children: JSX.Element;
}) {
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
