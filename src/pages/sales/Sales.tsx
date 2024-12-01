import { Show, For } from "solid-js";
import { createStore } from "solid-js/store";
import { SellingProcduct } from "../../types";

import "./sales.css";

const [testStore, setTestStore] = createStore({
  showNewSession: false,
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

export default function Sales() {
  const totalPrice = () =>
    testStore.sellingProducts.reduce((total, sellingProduct) => {
      return (total += sellingProduct.price * sellingProduct.quantity);
    }, 0);

  const disableAddSellingProductButton = () =>
    testStore.newSaleForm.productName.length === 0 ? true : false;

  function addSellingProduct() {
    const newSellingProduct: SellingProcduct = {
      productName: testStore.newSaleForm.productName,
      quantity: testStore.newSaleForm.quantity,
      price: testStore.newSaleForm.price,
    };

    setTestStore("sellingProducts", (currentSellingProducts) =>
      currentSellingProducts?.concat(newSellingProduct)
    );

    setTestStore("newSaleForm", (currentNewSaleForm) => {
      return { ...currentNewSaleForm, productName: "", quantity: 1, price: 0 };
    });
  }

  function deleteSellingProduct(index: number) {
    return () => {
      setTestStore("sellingProducts", (currentSellingProducts) =>
        currentSellingProducts.filter((currentSellingProduct, i) => i !== index)
      );
    };
  }

  function editSellingProduct(index: number) {
    return () => {
      const deleteAction = deleteSellingProduct(index);

      setTestStore("newSaleForm", (currentNewSaleForm) => {
        return {
          ...currentNewSaleForm,
          productName: testStore.sellingProducts[index].productName,
          price: testStore.sellingProducts[index].price,
          quantity: testStore.sellingProducts[index].quantity,
        };
      });

      deleteAction();
    };
  }

  function submitSale(e: SubmitEvent) {
    e.preventDefault();
  }

  return (
    <>
      <h2>Sales</h2>
      <button onclick={() => setTestStore("showNewSession", () => true)}>
        New session
      </button>

      <Show when={testStore.showNewSession}>
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
              value={testStore.newSaleForm.productName}
              oninput={(e) =>
                setTestStore("newSaleForm", (currentNewSaleForm) => {
                  return { ...currentNewSaleForm, productName: e.target.value };
                })
              }
              required
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
              value={testStore.newSaleForm.quantity}
              oninput={(e) => {
                setTestStore("newSaleForm", (currentNewSaleForm) => {
                  return {
                    ...currentNewSaleForm,
                    quantity: Number(e.target.value),
                  };
                });
              }}
              min={1}
              onfocus={(e) => e.target.select()}
              required
              data-testid="product-quantity-input"
            />

            <label for="product-price">Price</label>
            <input
              type="number"
              id="product-price"
              value={testStore.newSaleForm.price}
              oninput={(e) => {
                setTestStore("newSaleForm", (currentNewSaleForm) => {
                  return {
                    ...currentNewSaleForm,
                    price: Number(e.target.value),
                  };
                });
              }}
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

                <For each={testStore.sellingProducts}>
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
                value={testStore.newSaleForm.customerName}
                oninput={(e) =>
                  setTestStore("newSaleForm", (currentNewSaleForm) => {
                    return {
                      ...currentNewSaleForm,
                      customerName: e.target.value,
                    };
                  })
                }
              />

              <label for="remarks">Remarks</label>
              <textarea
                id="remarks"
                value={testStore.newSaleForm.remarks}
                oninput={(e) =>
                  setTestStore("newSaleForm", (currentNewSaleForm) => {
                    return { ...currentNewSaleForm, remarks: e.target.value };
                  })
                }
              ></textarea>

              <input
                type="checkbox"
                id="do-not-record"
                checked={testStore.newSaleForm.doNotRecord}
                onclick={() =>
                  setTestStore("newSaleForm", (currentNewSaleForm) => {
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
              <button
                onclick={() => setTestStore("showNewSession", () => false)}
              >
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Show>
    </>
  );
}
