import { Show, createSignal, For } from "solid-js";
import { newSaleFormType, SellingProcduct } from "../../types";

import "./sales.css";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  const [sellingProducts, setSellingProducts] = createSignal<SellingProcduct[]>(
    []
  );

  const [newSaleForm, setNewSaleForm] = createSignal<newSaleFormType>({
    productName: "",
    price: 0,
    quantity: 1,
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

    setNewSaleForm({
      ...newSaleForm(),
      productName: "",
      quantity: 1,
      price: 0,
    });
  }

  function submitSale(e: SubmitEvent) {
    e.preventDefault();
  }

  const totalPrice = () =>
    sellingProducts().reduce((totalPrice, currentProduct) => {
      return totalPrice + currentProduct.price * currentProduct.quantity;
    }, 0);

  function deleteSellingProduct(index: number) {
    return () =>
      setSellingProducts(
        sellingProducts().filter((sellingProduct, i) => i !== index)
      );
  }

  function editSellingProduct(index: number) {
    return () => {
      const deleteAction = deleteSellingProduct(index);
      setNewSaleForm({
        ...newSaleForm(),
        productName: sellingProducts()[index].productName,
        quantity: sellingProducts()[index].quantity,
        price: sellingProducts()[index].price,
      });

      deleteAction();
    };
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

          <form onSubmit={submitSale} aria-label="new sale form">
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
              data-testid="product-name"
            />
            <datalist id="product-list">
              <option value="torch">Torch</option>
              <option value="battery">battery</option>
            </datalist>

            <label for="product-quantity">Quantity</label>
            <input
              type="number"
              id="prodcut-quantity"
              placeholder={newSaleForm().quantity.toString()}
              oninput={(e) =>
                setNewSaleForm({
                  ...newSaleForm(),
                  quantity: Number(e.target.value),
                })
              }
              min={1}
              required
              data-testid="product-quantity"
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
              data-testid="product-price"
            />

            <button onclick={addSellingProduct}>Add</button>

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

                      <td>
                        <button onclick={editSellingProduct(index())}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onclick={deleteSellingProduct(index())}>
                          Delete
                        </button>
                      </td>
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

            <hr />

            <details>
              <summary>Additional sale info</summary>

              <label for="customer-name">Customer name</label>
              <input
                type="text"
                id="customer-name"
                value={newSaleForm().customerName}
                oninput={(e) =>
                  setNewSaleForm({
                    ...newSaleForm(),
                    customerName: e.target.value,
                  })
                }
              />

              <label for="remarks">Remarks</label>
              <textarea
                id="remarks"
                value={newSaleForm().remarks}
                oninput={(e) =>
                  setNewSaleForm({
                    ...newSaleForm(),
                    remarks: e.target.value,
                  })
                }
              ></textarea>

              <input
                type="checkbox"
                id="do-not-record"
                checked={newSaleForm().doNotRecord}
                onclick={() =>
                  setNewSaleForm({
                    ...newSaleForm(),
                    doNotRecord: !newSaleForm().doNotRecord,
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
