import {
  createEffect,
  createResource,
  createSignal,
  For,
  Suspense,
} from "solid-js";
import { getAllProductsOnStock } from "../../services/kadaServices";
import { ProductOnStock } from "../../types";

export default function ViewAllProducts() {
  const [searchText, setSearchText] = createSignal("");
  const [productsOnDisplay, setProductsOnDisplay] = createSignal<
    ProductOnStock[]
  >([]);

  const [products] = createResource(getAllProductsOnStock, {
    initialValue: [],
  });

  setProductsOnDisplay(products());

  createEffect(() => {
    setProductsOnDisplay(
      products().filter((product) =>
        product.name.toLowerCase().includes(searchText().toLowerCase())
      )
    );
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
            <For
              each={
                productsOnDisplay().length > 0
                  ? productsOnDisplay()
                  : products()
              }
            >
              {(product, index) => (
                <tr>
                  <td>{index() + 1}</td>
                  <td>{product.serial}</td>
                  <td>{product.name}</td>
                  <td>{product.mrp}</td>
                  <td>{product.stocks}</td>
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
