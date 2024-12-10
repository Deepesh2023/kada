import { createEffect, createResource, createSignal, Suspense } from "solid-js";

import { getAllProductsOnStock } from "../../services/kadaServices";
import { ProductOnStock } from "../../types";

import LoadingSpinner from "../../components/LoadingSpinner";
import AllProductsTable from "../../tables/AllProductsTable";

export default function ViewAllProducts() {
  const [searchText, setSearchText] = createSignal("");
  const [productsToDisplay, setProductsToDisplay] = createSignal<
    ProductOnStock[]
  >([]);

  const [productsOnStorage] = createResource(getAllProductsOnStock, {
    initialValue: [],
  });

  const products = () =>
    productsToDisplay().length > 0 ? productsToDisplay() : productsOnStorage();

  createEffect(() => {
    setProductsToDisplay(
      productsOnStorage().filter((product) =>
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

      <Suspense fallback={<LoadingSpinner />}>
        <AllProductsTable products={products} />
      </Suspense>
    </>
  );
}
