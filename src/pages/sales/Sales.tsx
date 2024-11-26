import { Show, createSignal } from "solid-js";
import { SellingProcduct } from "../../types";

import NewSellingProductForm from "../../forms/newSellingProductForm/NewSellingProductForm";

import "./sales.css";

import SellingProductsTable from "../../tables/sellingProductsTable/SellingProductsTable";

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

          <SellingProductsTable sellingProducts={sellingProducts()} />

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
