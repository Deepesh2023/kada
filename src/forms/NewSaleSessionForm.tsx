import { onMount, For } from "solid-js";

import { SetStoreFunction } from "solid-js/store";
import { NewSaleSessionStoreType } from "../types";
import { getAllProductsOnStock } from "../services/kadaServices";

import {
  initialSellingProductForm,
  intialAdditionalSaleDetails,
} from "../stores/newSaleSession";

import { ProductOnStock, SellingProduct } from "../types";

import SellingProductsTable from "../tables/SellingProductsTable";
import { Setter } from "solid-js/types/server/reactive.js";

export default function NewSaleSessionForm(props: {
  newSaleSession: NewSaleSessionStoreType;
  setNewSaleSession: SetStoreFunction<NewSaleSessionStoreType>;
  setShowNewSession: Setter<Boolean>;
}) {
  let productsOnStock: ProductOnStock[] = [];
  onMount(() => {
    productsOnStock = getAllProductsOnStock();
  });

  const disableAddSellingProductButton = () =>
    props.newSaleSession.sellingProductForm.name.length === 0 ? true : false;

  function submitSale(e: SubmitEvent) {
    e.preventDefault();

    props.setNewSaleSession("sellingProductForm", initialSellingProductForm);
    props.setNewSaleSession(
      "additionalSaleDetails",
      intialAdditionalSaleDetails
    );
    props.setNewSaleSession("sellingProducts", []);
  }

  function sellingProductNameInput(e: InputEvent) {
    const { value } = e.target as HTMLInputElement;

    const [name, serial] = value.split(",");

    if (serial) {
      props.setNewSaleSession("sellingProductForm", {
        name: name.trim(),
        serial: serial.trim(),
      });

      return;
    }

    props.setNewSaleSession("sellingProductForm", "name", name);
  }

  function addSellingProduct() {
    const newSellingProduct: SellingProduct = {
      ...props.newSaleSession.sellingProductForm,
    };

    props.setNewSaleSession(
      "sellingProducts",
      props.newSaleSession.sellingProducts.length,
      newSellingProduct
    );

    props.setNewSaleSession("sellingProductForm", initialSellingProductForm);
  }

  function cancelSale() {
    if (props.newSaleSession.sellingProducts.length === 0) {
      props.setNewSaleSession("sellingProductForm", initialSellingProductForm);
      props.setNewSaleSession(
        "additionalSaleDetails",
        intialAdditionalSaleDetails
      );
      props.setShowNewSession(false);
      return;
    }

    const shouldCancel = window.confirm(
      "Are you sure you want to cancel the sale?"
    );

    if (shouldCancel) {
      props.setNewSaleSession("sellingProductForm", initialSellingProductForm);
      props.setNewSaleSession(
        "additionalSaleDetails",
        intialAdditionalSaleDetails
      );
      props.setNewSaleSession("sellingProducts", []);

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
        value={props.newSaleSession.sellingProductForm.name}
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
        value={props.newSaleSession.sellingProductForm.quantity}
        oninput={(e) =>
          props.setNewSaleSession(
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
        value={props.newSaleSession.sellingProductForm.price}
        oninput={(e) =>
          props.setNewSaleSession(
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

      <SellingProductsTable
        newSaleSession={props.newSaleSession}
        setNewSaleSession={props.setNewSaleSession}
      />

      <hr />

      <details>
        <summary>Additional sale info</summary>

        <label for="customer-name">Customer name</label>
        <input
          type="text"
          id="customer-name"
          name="customerName"
          value={props.newSaleSession.additionalSaleDetails.customerName}
          oninput={(e) =>
            props.setNewSaleSession(
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
          value={props.newSaleSession.additionalSaleDetails.remarks}
          oninput={(e) =>
            props.setNewSaleSession(
              "additionalSaleDetails",
              "remarks",
              e.target.value
            )
          }
        ></textarea>

        <input
          type="checkbox"
          id="do-not-record"
          checked={props.newSaleSession.additionalSaleDetails.doNotRecord}
          onclick={() =>
            props.setNewSaleSession(
              "additionalSaleDetails",
              "doNotRecord",
              !props.newSaleSession.additionalSaleDetails.doNotRecord
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
