import { Show, createSignal, For } from "solid-js";

interface SellingProcduct {
  productName: string;
  quantity: number;
  price: number;
}

export default function Sales() {
  const [showNewSession, setShowNewSession] = createSignal(false);

  const [sellingProducts, setSellingProducts] = createSignal<SellingProcduct[]>(
    []
  );

  const [newSaleForm, setNewSaleForm] = createSignal({
    productName: "",
    price: 0,
    quantity: 1,
  });

  function addSellingProduct(e: SubmitEvent) {
    e.preventDefault();

    const newSellingProduct: SellingProcduct = {
      productName: newSaleForm().productName,
      quantity: newSaleForm().quantity,
      price: newSaleForm().price,
    };

    setSellingProducts((sellingProducts) =>
      sellingProducts?.concat(newSellingProduct)
    );
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

          <form onsubmit={addSellingProduct}>
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
            />

            <button type="submit">Add</button>
          </form>

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
                  </tr>
                )}
              </For>
            </tbody>
          </table>

          <div>
            <button onclick={() => setShowNewSession(false)}>Close</button>
            <button>Submit</button>
          </div>
        </div>
      </Show>
    </>
  );
}
