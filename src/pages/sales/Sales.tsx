import { Show, createSignal } from "solid-js";

interface SellingProcduct {
  productName: string;
  quantity: number;
  price: number;
}

export default function Sales() {
  let productSelectElement: undefined | HTMLSelectElement;
  let productQuantityElement: undefined | HTMLInputElement;
  let productPriceElement: undefined | HTMLInputElement;

  const [showNewSession, setShowNewSession] = createSignal(false);

  const [sellingProducts, setSellingProducts] = createSignal<
    SellingProcduct[] | null
  >(null);

  function addSellingProduct(e: Event) {
    e.preventDefault();

    console.log(
      productSelectElement?.value,
      productQuantityElement?.value,
      productPriceElement?.value
    );
  }

  return (
    <>
      <h2>sales</h2>
      <button onclick={() => setShowNewSession(true)}>New session</button>

      <Show when={showNewSession()}>
        <div>
          {/* yet to be implemented */}
          <input type="checkbox" name="" id="" />
          <label>Auto detect bar code scans</label>

          <form onsubmit={addSellingProduct}>
            <label for="product-select">Select product</label>
            <select
              id="product-select"
              ref={(el) => (productSelectElement = el)}
            >
              <option value="torch">Torch</option>
              <option value="battery">battery</option>
            </select>

            <label for="product-quantity">Quantity</label>
            <input
              type="number"
              id="prodcut-quantity"
              ref={(el) => (productQuantityElement = el)}
            />

            <label for="product-price">Price</label>
            <input
              type="number"
              id="product-price"
              ref={(el) => (productPriceElement = el)}
            />

            <button type="submit">Add</button>
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
