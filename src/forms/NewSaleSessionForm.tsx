import {
  For,
  useContext,
  createEffect,
  Suspense,
  createResource,
  Resource,
  Show,
} from "solid-js";

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
  setShowNewSession: Setter<boolean>;
}) {
  const { newSaleSession, setNewSaleSession } = useContext(
    StoreContext
  ) as NewSaleSessionStoreContext;

  const [productsOnStock] = createResource(getAllProductsOnStock, {
    initialValue: [],
  });

  const disableAddSellingProductButton = () =>
    newSaleSession.sellingProductForm.name.length === 0 ? true : false;

  createEffect(() => {
    const product = productsOnStock().find(
      (productOnStock) =>
        productOnStock.serial === newSaleSession.sellingProductForm.serial
    );

    setNewSaleSession("sellingProductForm", "price", product ? product.mrp : 0);
  });

  const isLowOnStock = () => {
    const product = productsOnStock().find(
      (productOnStock) =>
        productOnStock.serial === newSaleSession.sellingProductForm.serial
    );

    if (product) {
      return product.stocks < newSaleSession.sellingProductForm.quantity;
    }
  };

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

  function submitSale(e: SubmitEvent) {
    e.preventDefault();

    setNewSaleSession("sellingProductForm", initialSellingProductForm);
    setNewSaleSession("additionalSaleDetails", intialAdditionalSaleDetails);
    setNewSaleSession("sellingProducts", []);
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

      <ProductsOnStockDatalist productsOnStock={productsOnStock} />

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

      <Show when={isLowOnStock()}>
        <p>Low on stock</p>
      </Show>

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

function ProductsOnStockDatalist(props: {
  productsOnStock: Resource<ProductOnStock[]>;
}) {
  return (
    <datalist id="product-list">
      <Suspense fallback={<LoadingSpinner />}>
        <For each={props.productsOnStock()}>
          {(productOnStock) => (
            <option
              value={`${productOnStock.name}, ${productOnStock.serial}`}
            ></option>
          )}
        </For>
      </Suspense>
    </datalist>
  );
}

function LoadingSpinner() {
  return <option>Loaing...</option>;
}
