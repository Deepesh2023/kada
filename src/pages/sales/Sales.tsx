import { Show, For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { SellingProcduct } from "../../types";

import "./sales.css";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  const [newSaleSession, setNewSaleSession] = createStore({
    sellingProducts: new Array<SellingProcduct>(),
    newSaleForm: {
      productName: "",
      price: 0,
      quantity: 1,
      customerName: "",
      remarks: "",
      doNotRecord: false,
    },
  });

  const totalPrice = () =>
    newSaleSession.sellingProducts.reduce((total, sellingProduct) => {
      return (total += sellingProduct.price * sellingProduct.quantity);
    }, 0);

  const disableAddSellingProductButton = () =>
    newSaleSession.newSaleForm.productName.length === 0 ? true : false;

  function addSellingProduct() {
    const newSellingProduct: SellingProcduct = {
      productName: newSaleSession.newSaleForm.productName.trim(),
      quantity: newSaleSession.newSaleForm.quantity,
      price: newSaleSession.newSaleForm.price,
    };

    setNewSaleSession(
      "sellingProducts",
      newSaleSession.sellingProducts.length,
      newSellingProduct
    );

    setNewSaleSession("newSaleForm", (currentNewSaleForm) => {
      return { productName: "", quantity: 1, price: 0 };
    });
  }

  function deleteSellingProduct(index: number) {
    return () => {
      setNewSaleSession("sellingProducts", (currentSellingProducts) =>
        currentSellingProducts.splice(index, 1)
      );
    };
  }

  function editSellingProduct(index: number) {
    return () => {
      const deleteAction = deleteSellingProduct(index);

      setNewSaleSession("newSaleForm", (currentNewSaleForm) => {
        return {
          productName: newSaleSession.sellingProducts[index].productName,
          price: newSaleSession.sellingProducts[index].price,
          quantity: newSaleSession.sellingProducts[index].quantity,
        };
      });

      deleteAction();
    };
  }

  function inputHandler() {
    return (e: InputEvent) => {
      const { name, value } = e.target as HTMLInputElement;

      setNewSaleSession("newSaleForm", (currentNewSaleForm) => {
        return {
          [name]: Number(value) ? Number(value) : value,
        };
      });
    };
  }

  function submitSale(e: SubmitEvent) {
    e.preventDefault();
    console.log(newSaleSession);
  }

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

          <form onSubmit={submitSale} aria-label="new sale form">
            <label for="product-name">Select product</label>
            <input
              type="text"
              list="product-list"
              id="product-name"
              name="productName"
              value={newSaleSession.newSaleForm.productName}
              oninput={inputHandler()}
              data-testid="product-name-input"
            />
            <datalist id="product-list">
              <option value="torch">Torch</option>
              <option value="battery">battery</option>
            </datalist>

            <label for="product-quantity">Quantity</label>
            <input
              type="number"
              id="product-quantity"
              name="quantity"
              value={newSaleSession.newSaleForm.quantity}
              oninput={inputHandler()}
              min={1}
              onfocus={(e) => e.target.select()}
              required
              data-testid="product-quantity-input"
            />

            <label for="product-price">Price</label>
            <input
              type="number"
              id="product-price"
              name="price"
              value={newSaleSession.newSaleForm.price}
              oninput={inputHandler()}
              required
              min={0}
              data-testid="product-price-input"
            />

            <button
              onclick={addSellingProduct}
              disabled={disableAddSellingProductButton()}
            >
              Add
            </button>

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

                <For each={newSaleSession.sellingProducts}>
                  {(sellingProduct, index) => (
                    <tr data-testid="selling-product-row">
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
                  <th colSpan={4}>Total: </th>
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
                name="customerName"
                value={newSaleSession.newSaleForm.customerName}
                oninput={inputHandler()}
              />

              <label for="remarks">Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={newSaleSession.newSaleForm.remarks}
                oninput={inputHandler()}
              ></textarea>

              <input
                type="checkbox"
                id="do-not-record"
                checked={newSaleSession.newSaleForm.doNotRecord}
                onclick={() =>
                  setNewSaleSession("newSaleForm", (currentNewSaleForm) => {
                    return {
                      ...currentNewSaleForm,
                      doNotRecord: !currentNewSaleForm.doNotRecord,
                    };
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
