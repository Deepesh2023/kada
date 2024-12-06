import { Show, createContext, createSignal } from "solid-js";

import "./sales.css";
import { getNewSaleSessionStore } from "../../stores/newSaleSession";

import NewSaleSessionForm from "../../forms/NewSaleSessionForm";
import { NewSaleSessionStoreContext } from "../../types";

export const StoreContext = createContext<NewSaleSessionStoreContext | null>(
  null
);

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

          <StoreContext.Provider value={{ newSaleSession, setNewSaleSession }}>
            <NewSaleSessionForm setShowNewSession={setShowNewSession} />
          </StoreContext.Provider>
        </div>
      </Show>
    </>
  );
}
