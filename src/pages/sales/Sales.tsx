import { Show, createSignal } from "solid-js";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  return (
    <>
      <h2>sales</h2>
      <button onclick={() => setShowNewSession(true)}>New session</button>

      <Show when={showNewSession()}>
        <div>
          <form>
            {/* yet to be implemented */}
            <input type="checkbox" name="" id="" />
            <label>Auto detect bar code scans</label>

            <div>
              <button onclick={() => setShowNewSession(false)}>Close</button>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </Show>
    </>
  );
}
