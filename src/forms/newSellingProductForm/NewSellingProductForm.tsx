import { createSignal } from "solid-js";
import { NewSellingProductFormPropsType, SellingProcduct } from "../../types";

export default function NewSellingProductForm(
  props: NewSellingProductFormPropsType
) {
  const [newSaleForm, setNewSaleForm] = createSignal({
    productName: "",
    price: 0,
    quantity: 1,
  });

  function submitProduct(e: SubmitEvent) {
    e.preventDefault();

    const newSellingProduct: SellingProcduct = {
      productName: newSaleForm().productName,
      quantity: newSaleForm().quantity,
      price: newSaleForm().price,
    };

    props.addSellingProduct(newSellingProduct);
    setNewSaleForm({ productName: "", quantity: 1, price: 0 });
  }

  return (
    <form onsubmit={submitProduct}>
      <label for="product-name">Select product</label>
      <input
        type="text"
        list="product-list"
        id="product-name"
        value={newSaleForm().productName}
        oninput={(e) =>
          setNewSaleForm({ ...newSaleForm(), productName: e.target.value })
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

      <button type="submit">Add</button>
    </form>
  );
}
