import { Show, createSignal, For } from "solid-js";
import { SellingProcduct } from "../../types";

import NewSellingProductForm from "../../forms/newSellingProductForm/NewSellingProductForm";

import "./sales.css";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  const [sellingProducts, setSellingProducts] = createSignal<SellingProcduct[]>(
    []
  );

  function addSellingProduct(sellingProduct: SellingProcduct) {
    setSellingProducts((sellingProducts) =>
      sellingProducts?.concat(sellingProduct)
    );
  }

  const totalPrice = () =>
    sellingProducts().reduce((totalPrice, currentProduct) => {
      return totalPrice + currentProduct.price * currentProduct.quantity;
    }, 0);

  return (
    <>
      <h2>sales</h2>
      <button onclick={() => setShowNewSession(true)}>New session</button>

      <Show when={showNewSession()}>
        <div>
          {/* yet to be implemented */}
          <input type="checkbox" name="" id="" />
          <label>Auto detect bar code scans</label>

          <hr />

          <NewSellingProductForm addSellingProduct={addSellingProduct} />

          <hr />

          <table>
            <tbody>
              <tr>
                <th>No</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Price X quantity</th>
              </tr>

              <For each={sellingProducts()}>
                {(sellingProduct, index) => (
                  <tr>
                    <td>{index() + 1}</td>
                    <td>{sellingProduct.productName}</td>
                    <td>{sellingProduct.price}</td>
                    <td>{sellingProduct.quantity}</td>
                    <td>{sellingProduct.price * sellingProduct.quantity}</td>
                  </tr>
                )}
              </For>
            </tbody>

            <tfoot>
              <tr>
                <th colSpan={4}>Total</th>
                <td>{totalPrice()}</td>
              </tr>
            </tfoot>
          </table>

          <div>
            <button onclick={() => setShowNewSession(false)}>Close</button>
            <button>Submit</button>
          </div>
        </div>

        <hr />
      </Show>
    </>
  );
}
