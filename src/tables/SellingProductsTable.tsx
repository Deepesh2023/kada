import { For, useContext } from "solid-js";

import { NewSaleSessionStoreContext } from "../types";
import { StoreContext } from "../pages/sales/Sales";

export default function SellingProductsTable() {
  const { newSaleSession, setNewSaleSession } = useContext(
    StoreContext
  ) as NewSaleSessionStoreContext;

  const totalPrice = () =>
    newSaleSession.sellingProducts.reduce((total, sellingProduct) => {
      return (total += sellingProduct.price * sellingProduct.quantity);
    }, 0);

  function deleteSellingProduct(index: number) {
    return () => {
      setNewSaleSession(
        "sellingProducts",
        newSaleSession.sellingProducts.toSpliced(index, 1)
      );
    };
  }

  function editSellingProduct(index: number) {
    return () => {
      const deleteAction = deleteSellingProduct(index);

      setNewSaleSession("sellingProductForm", {
        name: newSaleSession.sellingProducts[index].name,
        price: newSaleSession.sellingProducts[index].price,
        quantity: newSaleSession.sellingProducts[index].quantity,
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

        <For each={newSaleSession.sellingProducts}>
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
