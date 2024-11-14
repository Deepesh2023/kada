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

  return (
    <div class="sales-service-page">
      <DialogBox
        isDialogVisible={addNewSaleClicked}
        setDialogVisiblity={setAddNewSaleClicked}
      >
        <h1>hello</h1>
      </DialogBox>

      <AddNewButtonStack
        addNewSaleClicked={addNewSaleClicked}
        setAddNewSaleClicked={setAddNewSaleClicked}
      />
    </div>
  );
}

function AddNewButtonStack(props: {
  addNewSaleClicked: Accessor<boolean>;
  setAddNewSaleClicked: Setter<boolean>;
}) {
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    createSignal<boolean>(false);

  return (
    <div class="add-new-button-stack">
      <Show when={isAddNewButtonClicked()}>
        <button onclick={() => props.setAddNewSaleClicked(true)}>Sale</button>
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
