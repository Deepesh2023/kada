import { A } from "@solidjs/router";

export default function ManageStore() {
  return (
    <>
      <h2>Manage store</h2>

      <ul>
        <li>
          <A href="view-all-products">View all products</A>
        </li>
      </ul>
    </>
  );
}
