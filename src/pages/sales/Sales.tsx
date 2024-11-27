import { Show, createSignal } from "solid-js";
import { SellingProcduct } from "../../types";

import "./sales.css";

import SellingProductsTable from "../../tables/sellingProductsTable/SellingProductsTable";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  const [sellingProducts, setSellingProducts] = createSignal<SellingProcduct[]>(
    []
  );

  const [newSaleForm, setNewSaleForm] = createSignal({
    productName: "",
    price: 0,
    quantity: 1,
  });

  const [additonalSaleDetailsForm, setAdditionalSalesForm] = createSignal({
    customerName: "",
    remarks: "",
    doNotRecord: false,
  });

  function addSellingProduct() {
    const newSellingProduct: SellingProcduct = {
      productName: newSaleForm().productName,
      quantity: newSaleForm().quantity,
      price: newSaleForm().price,
    };

    setSellingProducts((sellingProducts) =>
      sellingProducts?.concat(newSellingProduct)
    );

    setNewSaleForm({ productName: "", quantity: 1, price: 0 });
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

          <form>
            <label for="product-name">Select product</label>
            <input
              type="text"
              list="product-list"
              id="product-name"
              value={newSaleForm().productName}
              oninput={(e) =>
                setNewSaleForm({
                  ...newSaleForm(),
                  productName: e.target.value,
                })
              }
              required
            />
            <datalist id="product-list">
              <option value="torch">Torch</option>
              <option value="battery">battery</option>
            </datalist>

            <label for="product-quantity">Quantity</label>
            <input
              type="number"
              id="prodcut-quantity"
              value={newSaleForm().quantity}
              oninput={(e) =>
                setNewSaleForm({
                  ...newSaleForm(),
                  quantity: Number(e.target.value),
                })
              }
              min={1}
              required
            />

            <label for="product-price">Price</label>
            <input
              type="number"
              id="product-price"
              value={newSaleForm().price}
              oninput={(e) =>
                setNewSaleForm({
                  ...newSaleForm(),
                  price: Number(e.target.value),
                })
              }
              required
              min={0}
            />

            <button onclick={addSellingProduct}>Add</button>

            <hr />

            <SellingProductsTable
              sellingProducts={sellingProducts}
              setSellingProducts={setSellingProducts}
            />

            <hr />

            <details>
              <summary>Additional sale info</summary>

              <label for="customer-name">Customer name</label>
              <input
                type="text"
                id="customer-name"
                value={additonalSaleDetailsForm().customerName}
                oninput={(e) =>
                  setAdditionalSalesForm({
                    ...additonalSaleDetailsForm(),
                    customerName: e.target.value,
                  })
                }
              />

              <label for="remarks">Remarks</label>
              <textarea
                id="remarks"
                value={additonalSaleDetailsForm().remarks}
                oninput={(e) =>
                  setAdditionalSalesForm({
                    ...additonalSaleDetailsForm(),
                    remarks: e.target.value,
                  })
                }
              ></textarea>

              <input
                type="checkbox"
                id="do-not-record"
                checked={additonalSaleDetailsForm().doNotRecord}
                onclick={() =>
                  setAdditionalSalesForm({
                    ...additonalSaleDetailsForm(),
                    doNotRecord: !additonalSaleDetailsForm().doNotRecord,
                  })
                }
              />
              <label>Do not include in records</label>
            </details>

            <hr />

            <div>
              <button onclick={() => setShowNewSession(false)}>Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Show>
    </>
  );
}
