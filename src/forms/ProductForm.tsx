import { createStore } from "solid-js/store";
import { ProductOnStock } from "../types";
import { createUniqueId } from "solid-js";

const initialNewProductForm: ProductOnStock = {
  serial: "",
  name: "",
  stocks: 0,
  mrp: 0,
};

export default function ProductForm() {
  const [newProductForm, setNewProductForm] = createStore({
    ...initialNewProductForm,
  });

  function generateSerial() {
    // yet to implemented

    if (isSerialRepeated()) {
      return;
    }

    setNewProductForm("serial", createUniqueId());
  }

  function isSerialRepeated() {
    return false;
  }

  function addProduct(e: SubmitEvent) {
    e.preventDefault();
    setNewProductForm(initialNewProductForm);
  }

  return (
    <>
      <h2>Product form</h2>

      <form onsubmit={addProduct}>
        <label for="product-name">Product name: </label>
        <input
          type="text"
          id="product-name"
          value={newProductForm.name}
          onchange={(e) => setNewProductForm("name", e.target.value)}
          required
        />

        <label for="serial">Serial</label>
        <input
          type="text"
          id="serial"
          value={newProductForm.serial}
          onchange={(e) => setNewProductForm("serial", e.target.value)}
          required
        />
        <button type="button" onclick={generateSerial}>
          Generate serial
        </button>

        <label for="stocks">Stocks</label>
        <input
          type="number"
          id="stocks"
          value={newProductForm.stocks}
          onchange={(e) => setNewProductForm("stocks", Number(e.target.value))}
          min={1}
          required
        />

        <label for="mrp">MRP</label>
        <input
          type="number"
          id="mrp"
          value={newProductForm.mrp}
          onchange={(e) => setNewProductForm("mrp", Number(e.target.value))}
          required
        />

        <h3>Photos</h3>

        <button type="submit">Add</button>
      </form>
    </>
  );
}
