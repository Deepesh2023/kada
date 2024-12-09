import { createResource, createSignal, For, Suspense } from "solid-js";
import { getAllProductsOnStock } from "../../services/kadaServices";

export default function ViewAllProducts() {
  const [searchText, setSearchText] = createSignal("");

  const [products] = createResource(getAllProductsOnStock, {
    initialValue: [],
  });

  return (
    <>
      <h2>All products</h2>

      <label for="search">Search</label>
      <input
        type="text"
        id="search"
        value={searchText()}
        oninput={(e) => setSearchText(e.target.value)}
      />

      <table>
        <tbody>
          <tr>
            <th>No</th>
            <th>Serial</th>
            <th>Name</th>
            <th>MRP</th>
            <th>Stock</th>
          </tr>

          <Suspense fallback={<LoadingRows />}>
            <For each={products()}>
              {(product, index) => (
                <tr>
                  <td>{index()}</td>
                  <td>{product.serial}</td>
                  <td>{product.name}</td>
                  <td>{product.mrp}</td>
                  <td>{product.stocks}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              )}
            </For>
          </Suspense>
        </tbody>
      </table>
    </>
  );
}

function LoadingRows() {
  return (
    <>
      <td colspan={4}>Loading...</td>
    </>
  );
}
