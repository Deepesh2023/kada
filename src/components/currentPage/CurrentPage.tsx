import { Route, Router } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";

import "./currentPage.css";

import SalesService from "../../pages/sales-service/SalesService";
import ManageStocks from "../../pages/ManageStocks";
import History from "../../pages/History";
import Stats from "../../pages/Stats";
import Settings from "../../pages/Settings";
import MenuBar from "../menuBar/MenuBar";
import { navLinksComponent } from "../navbar/NavLinks";

export default function CurrentPage() {
  const [isMenuVisible, setMenuVisibility] = createSignal(false);

  function eventHandler(e: MouseEvent) {
    if (e.target !== navLinksComponent) {
      setMenuVisibility(false);
    }
  }

  createEffect(() => {
    if (isMenuVisible()) {
      document.addEventListener("click", eventHandler);
    }

    onCleanup(() => document.removeEventListener("click", eventHandler));
  });

  return (
    <div class="current-page">
      <div class="spacer">
        <div class="header">
          <button id="menu" onclick={() => setMenuVisibility(true)}>
            Menu
          </button>
          <h1>Kada</h1>
        </div>
      </div>

      <Show when={isMenuVisible()}>
        <MenuBar setMenuVisibility={setMenuVisibility} />
      </Show>

      <div class="route-group">
        <Router>
          <Route path={"/sales-service"} component={SalesService} />
          <Route path={"/manage-stocks"} component={ManageStocks} />
          <Route path={"/history"} component={History} />
          <Route path={"/stats"} component={Stats} />
          <Route path={"/settings"} component={Settings} />
        </Router>
      </div>
    </div>
  );
}
