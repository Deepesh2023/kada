import { onMount, For, useContext } from "solid-js";

import { NewSaleSessionStoreContext } from "../types";
import { getAllProductsOnStock } from "../services/kadaServices";

import {
  initialSellingProductForm,
  intialAdditionalSaleDetails,
} from "../stores/newSaleSession";

import { ProductOnStock, SellingProduct } from "../types";

import SellingProductsTable from "../tables/SellingProductsTable";
import { Setter } from "solid-js/types/server/reactive.js";
import { StoreContext } from "../pages/sales/Sales";

export default function NewSaleSessionForm(props: {
  setShowNewSession: Setter<Boolean>;
}) {
  const { newSaleSession, setNewSaleSession } = useContext(
    StoreContext
  ) as NewSaleSessionStoreContext;

  let productsOnStock: ProductOnStock[] = [];
  onMount(() => {
    productsOnStock = getAllProductsOnStock();
  });

  const disableAddSellingProductButton = () =>
    newSaleSession.sellingProductForm.name.length === 0 ? true : false;

  function submitSale(e: SubmitEvent) {
    e.preventDefault();

    setNewSaleSession("sellingProductForm", initialSellingProductForm);
    setNewSaleSession("additionalSaleDetails", intialAdditionalSaleDetails);
    setNewSaleSession("sellingProducts", []);
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

  function addSellingProduct() {
    const newSellingProduct: SellingProduct = {
      ...newSaleSession.sellingProductForm,
    };

    setNewSaleSession(
      "sellingProducts",
      newSaleSession.sellingProducts.length,
      newSellingProduct
    );

    setNewSaleSession("sellingProductForm", initialSellingProductForm);
  }

  function cancelSale() {
    if (newSaleSession.sellingProducts.length === 0) {
      setNewSaleSession("sellingProductForm", initialSellingProductForm);
      setNewSaleSession("additionalSaleDetails", intialAdditionalSaleDetails);
      props.setShowNewSession(false);
      return;
    }

    const shouldCancel = window.confirm(
      "Are you sure you want to cancel the sale?"
    );

    if (shouldCancel) {
      setNewSaleSession("sellingProductForm", initialSellingProductForm);
      setNewSaleSession("additionalSaleDetails", intialAdditionalSaleDetails);
      setNewSaleSession("sellingProducts", []);

      props.setShowNewSession(false);
    }

    return;
  }

  return (
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

      <SellingProductsTable />

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
  );
}
