import { Show, createSignal } from "solid-js";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  return (
    <>
      <h2>sales</h2>
      <button onclick={() => setShowNewSession(true)}>New session</button>

      <Show when={showNewSession()}>
        <div>
          {/* yet to be implemented */}
          <input type="checkbox" name="" id="" />
          <label>Auto detect bar code scans</label>

          <form action="">
            <label for="product-select">Select product</label>
            <select name="" id="product-select">
              <option value="">Torch</option>
              <option value="">battery</option>
            </select>

            <label for="product-quantity">Quantity</label>
            <input type="number" id="prodcut-quantity" />

            <label for="product-price">Price</label>
            <input type="number" id="product-price" />

            <button>Add</button>
          </form>

          <table>
            <tbody>
              <tr>
                <th>No</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Price X quantity</th>
              </tr>
            </tbody>
          </table>

          <div>
            <button onclick={() => setShowNewSession(false)}>Close</button>
            <button>Submit</button>
          </div>
        </div>
      </Show>
    </>
  );
}
