import { Route, Router } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

import "./currentPage.css";

import SalesService from "../../pages/sales-service/SalesService";
import ManageStocks from "../../pages/ManageStocks";
import History from "../../pages/History";
import Stats from "../../pages/Stats";
import Settings from "../../pages/Settings";
import MenuBar from "../menuBar/MenuBar";

export default function CurrentPage() {
  const [isMenuVisible, setMenuVisibility] = createSignal(false);

  return (
    <div class="current-page">
      <button id="menu" onclick={() => setMenuVisibility(true)}>
        Menu
      </button>
      <h1>Kada</h1>

      <Show when={isMenuVisible()}>
        <MenuBar setMenuVisibility={setMenuVisibility} />
      </Show>

      <Router>
        <Route path={"/sales-service"} component={SalesService} />
        <Route path={"/manage-stocks"} component={ManageStocks} />
        <Route path={"/history"} component={History} />
        <Route path={"/stats"} component={Stats} />
        <Route path={"/settings"} component={Settings} />
      </Router>
    </div>
  );
}
