import { Show, createSignal } from "solid-js";

import "./sales.css";
import { getNewSaleSessionStore } from "../../stores/newSaleSession";

import NewSaleSessionForm from "../../forms/NewSaleSessionForm";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);
  const { newSaleSession, setNewSaleSession } = getNewSaleSessionStore();

  return (
    <>
      <h2>Sales</h2>
      <button onclick={() => setShowNewSession(true)}>New session</button>

      <Show when={showNewSession()}>
        <div data-testid="new-sale-form">
          {/* yet to be implemented */}
          <input type="checkbox" name="" id="" />
          <label>Auto detect bar code scans</label>

          <hr />

          <NewSaleSessionForm
            newSaleSession={newSaleSession}
            setNewSaleSession={setNewSaleSession}
            setShowNewSession={setShowNewSession}
          />
        </div>
      </Show>
    </>
  );
}
