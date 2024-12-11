import { createStore } from "solid-js/store";
import { ProductOnStock } from "../types";

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

  return (
    <>
      <h2>Product form</h2>

      <form action="">
        <label for="product-name">Product name: </label>
        <input
          type="text"
          id="product-name"
          value={newProductForm.name}
          onchange={(e) => setNewProductForm("name", e.target.value)}
        />

        <label for="serial">Serial</label>
        <input
          type="text"
          id="serial"
          value={newProductForm.serial}
          onchange={(e) => setNewProductForm("serial", e.target.value)}
        />
        <button type="button">Generate serial</button>

        <label for="stocks">Stocks</label>
        <input
          type="number"
          id="stocks"
          value={newProductForm.stocks}
          onchange={(e) => setNewProductForm("stocks", Number(e.target.value))}
        />

        <label for="mrp">MRP</label>
        <input
          type="number"
          id="mrp"
          value={newProductForm.mrp}
          onchange={(e) => setNewProductForm("mrp", Number(e.target.value))}
        />

        <h3>Photos</h3>

        <button>Add</button>
      </form>
    </>
  );
}
