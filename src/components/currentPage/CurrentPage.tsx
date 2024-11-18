import { Route, Router } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";

import "./currentPage.css";

import SalesService from "../../pages/sales-service/SalesService";
import ManageStocks from "../../pages/ManageStocks";
import History from "../../pages/History";
import Stats from "../../pages/Stats";
import Settings from "../../pages/Settings";
import MenuBar from "../menuBar/MenuBar";
import { navLinksComponent } from "../navLinks/NavLinks";

export default function CurrentPage() {
  const [isMenuVisible, setMenuVisibility] = createSignal(false);

  let spacer: undefined | HTMLDivElement;

  function closeMenu(e: MouseEvent) {
    if (e.target !== navLinksComponent || e.target !== spacer) {
      setMenuVisibility(false);
    }
  }

  createEffect(() => {
    if (isMenuVisible()) {
      document.addEventListener("click", closeMenu);
    }

    onCleanup(() => document.removeEventListener("click", closeMenu));
  });

  return (
    <div class="current-page">
      <div class="spacer" ref={(el) => (spacer = el)}>
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
