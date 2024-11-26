import { For } from "solid-js";
import { SellingProcduct } from "../../types";

import "./sellingProductsTable.css";

export default function SellingProductsTable(props: {
  sellingProducts: SellingProcduct[];
}) {
  const totalPrice = () =>
    props.sellingProducts.reduce((totalPrice, currentProduct) => {
      return totalPrice + currentProduct.price * currentProduct.quantity;
    }, 0);

  return (
    <table>
      <tbody>
        <tr>
          <th>No</th>
          <th>Product name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Price X quantity</th>
        </tr>

        <For each={props.sellingProducts}>
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

      <tfoot>
        <tr>
          <th colSpan={4}>Total</th>
          <td>{totalPrice()}</td>
        </tr>
      </tfoot>
    </table>
  );
}
