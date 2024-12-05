import { Show, For, createSignal, onMount, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { ProductOnStock, SellingProduct } from "../../types";

import "./sales.css";
import { getAllProductsOnStock } from "../../services/kadaServices";

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  const initialSellingProductForm = {
    serial: "",
    name: "",
    price: 0,
    quantity: 1,
  };

  const intialAdditionalSaleDetails = {
    customerName: "",
    remarks: "",
    doNotRecord: false,
  };

  const [newSaleSession, setNewSaleSession] = createStore({
    sellingProductForm: initialSellingProductForm,
    sellingProducts: new Array<SellingProduct>(),
    additionalSaleDetails: intialAdditionalSaleDetails,
  });

  let productsOnStock: ProductOnStock[] = [];
  onMount(() => {
    productsOnStock = getAllProductsOnStock();
  });

  createEffect(() => {
    const product = productsOnStock.find(
      (productOnStock) =>
        productOnStock.serial === newSaleSession.sellingProductForm.serial
    );

    setNewSaleSession("sellingProductForm", "price", product ? product.mrp : 0);
  });

  const totalPrice = () =>
    newSaleSession.sellingProducts.reduce((total, sellingProduct) => {
      return (total += sellingProduct.price * sellingProduct.quantity);
    }, 0);

  const disableAddSellingProductButton = () =>
    newSaleSession.sellingProductForm.name.length === 0 ? true : false;

  function addSellingProduct() {
    const newSellingProduct: SellingProduct = {
      serial: newSaleSession.sellingProductForm.serial,
      name: newSaleSession.sellingProductForm.name,
      quantity: newSaleSession.sellingProductForm.quantity,
      price: newSaleSession.sellingProductForm.price,
    };

    setNewSaleSession(
      "sellingProducts",
      newSaleSession.sellingProducts.length,
      newSellingProduct
    );

    setNewSaleSession("sellingProductForm", { ...initialSellingProductForm });
  }

  function deleteSellingProduct(index: number) {
    return () => {
      setNewSaleSession(
        "sellingProducts",
        newSaleSession.sellingProducts.toSpliced(index, 1)
      );
    };
  }

  function editSellingProduct(index: number) {
    return () => {
      const deleteAction = deleteSellingProduct(index);

      setNewSaleSession("sellingProductForm", {
        name: newSaleSession.sellingProducts[index].name,
        price: newSaleSession.sellingProducts[index].price,
        quantity: newSaleSession.sellingProducts[index].quantity,
      });

      deleteAction();
    };
  }

  function submitSale(e: SubmitEvent) {
    e.preventDefault();

    setNewSaleSession("sellingProductForm", initialSellingProductForm);
    setNewSaleSession("additionalSaleDetails", intialAdditionalSaleDetails);
    setNewSaleSession("sellingProducts", []);
  }

  function cancelSale() {
    if (newSaleSession.sellingProducts.length === 0) {
      setNewSaleSession("sellingProductForm", initialSellingProductForm);
      setNewSaleSession("additionalSaleDetails", intialAdditionalSaleDetails);
      setShowNewSession(false);
      return;
    }

    const shouldCancel = window.confirm(
      "Are you sure you want to cancel the sale?"
    );

    if (shouldCancel) {
      setNewSaleSession("sellingProductForm", initialSellingProductForm);
      setNewSaleSession("additionalSaleDetails", intialAdditionalSaleDetails);
      setNewSaleSession("sellingProducts", []);

      setShowNewSession(false);
    }

    return;
  }

  function sellingProductNameInput(e: InputEvent) {
    const { value } = e.target as HTMLInputElement;

    const [name, serial] = value.split(",");

    if (serial) {
      setNewSaleSession("sellingProductForm", {
        name: name.trim(),
        serial: serial.trim(),
      });

      return;
    }

    setNewSaleSession("sellingProductForm", "name", name);
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

          <form onsubmit={submitSale} aria-label="new sale form">
            <label for="product-name">Select product</label>
            <input
              type="text"
              list="product-list"
              id="product-name"
              name="productName"
              value={newSaleSession.sellingProductForm.name}
              oninput={sellingProductNameInput}
              data-testid="product-name-input"
            />
            <datalist id="product-list">
              <For each={productsOnStock}>
                {(productOnStock) => (
                  <option
                    value={`${productOnStock.name}, ${productOnStock.serial}`}
                  ></option>
                )}
              </For>
            </datalist>

            <label for="product-quantity">Quantity</label>
            <input
              type="number"
              id="product-quantity"
              name="quantity"
              value={newSaleSession.sellingProductForm.quantity}
              oninput={(e) =>
                setNewSaleSession(
                  "sellingProductForm",
                  "quantity",
                  Number(e.target.value)
                )
              }
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
              value={newSaleSession.sellingProductForm.price}
              oninput={(e) =>
                setNewSaleSession(
                  "sellingProductForm",
                  "price",
                  Number(e.target.value)
                )
              }
              required
              min={0}
              data-testid="product-price-input"
            />

            <button
              type="button"
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
                  <th>Serial</th>
                  <th>Product name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Price X quantity</th>
                </tr>

                <For each={newSaleSession.sellingProducts}>
                  {(sellingProduct, index) => (
                    <tr>
                      <td>{index() + 1}</td>
                      <td>{sellingProduct.serial}</td>
                      <td>{sellingProduct.name}</td>
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
                value={newSaleSession.additionalSaleDetails.customerName}
                oninput={(e) =>
                  setNewSaleSession(
                    "additionalSaleDetails",
                    "customerName",
                    e.target.value
                  )
                }
              />

              <label for="remarks">Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={newSaleSession.additionalSaleDetails.remarks}
                oninput={(e) =>
                  setNewSaleSession(
                    "additionalSaleDetails",
                    "remarks",
                    e.target.value
                  )
                }
              ></textarea>

              <input
                type="checkbox"
                id="do-not-record"
                checked={newSaleSession.additionalSaleDetails.doNotRecord}
                onclick={() =>
                  setNewSaleSession(
                    "additionalSaleDetails",
                    "doNotRecord",
                    !newSaleSession.additionalSaleDetails.doNotRecord
                  )
                }
              />
              <label>Do not include in records</label>
            </details>

            <hr />

            <div>
              <button onclick={cancelSale}>Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Show>
    </>
  );
}
