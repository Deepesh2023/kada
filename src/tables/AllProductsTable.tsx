import { Accessor, For } from "solid-js";
import { ProductOnStock } from "../types";

export default function AllProductsTable(props: {
  products: Accessor<ProductOnStock[]>;
}) {
  return (
    <table>
      <tbody>
        <tr>
          <th>No</th>
          <th>Serial</th>
          <th>Name</th>
          <th>MRP</th>
          <th>Stock</th>
        </tr>

        <For each={props.products()}>
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
      </tbody>
    </table>
  );
}
