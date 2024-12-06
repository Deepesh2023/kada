import { For } from "solid-js";
import { createEffect } from "solid-js";

import { NewSaleSessionStoreType, ProductOnStock } from "../types";
import { SetStoreFunction } from "solid-js/store";

export default function SellingProductsTable(props: {
  newSaleSession: NewSaleSessionStoreType;
  setNewSaleSession: SetStoreFunction<NewSaleSessionStoreType>;
}) {
  let productsOnStock: ProductOnStock[] = [];
  createEffect(() => {
    const product = productsOnStock.find(
      (productOnStock) =>
        productOnStock.serial === props.newSaleSession.sellingProductForm.serial
    );

    props.setNewSaleSession(
      "sellingProductForm",
      "price",
      product ? product.mrp : 0
    );
  });

  const totalPrice = () =>
    props.newSaleSession.sellingProducts.reduce((total, sellingProduct) => {
      return (total += sellingProduct.price * sellingProduct.quantity);
    }, 0);

  function deleteSellingProduct(index: number) {
    return () => {
      props.setNewSaleSession(
        "sellingProducts",
        props.newSaleSession.sellingProducts.toSpliced(index, 1)
      );
    };
  }

  function editSellingProduct(index: number) {
    return () => {
      const deleteAction = deleteSellingProduct(index);

      props.setNewSaleSession("sellingProductForm", {
        name: props.newSaleSession.sellingProducts[index].name,
        price: props.newSaleSession.sellingProducts[index].price,
        quantity: props.newSaleSession.sellingProducts[index].quantity,
      });

      deleteAction();
    };
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>No</th>
          <th>Serial</th>
          <th>Product name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Price X quantity</th>
        </tr>

        <For each={props.newSaleSession.sellingProducts}>
          {(sellingProduct, index) => (
            <tr>
              <td>{index() + 1}</td>
              <td>{sellingProduct.serial}</td>
              <td>{sellingProduct.name}</td>
              <td>{sellingProduct.price}</td>
              <td>{sellingProduct.quantity}</td>
              <td>{sellingProduct.price * sellingProduct.quantity}</td>

              <td>
                <button onclick={editSellingProduct(index())}>Edit</button>
              </td>
              <td>
                <button onclick={deleteSellingProduct(index())}>Delete</button>
              </td>
            </tr>
          )}
        </For>
      </tbody>

      <tfoot>
        <tr>
          <th colSpan={4}>Total: </th>
          <td>{totalPrice()}</td>
        </tr>
      </tfoot>
    </table>
  );
}
