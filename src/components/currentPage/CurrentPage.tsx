import { Route, Router } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";

import "./currentPage.css";

import SalesService from "../../pages/sales-service/SalesService";
import ManageStocks from "../../pages/ManageStocks";
import History from "../../pages/History";
import Stats from "../../pages/Stats";
import Settings from "../../pages/Settings";
import MenuBar, { menuBarHTMLElement } from "../menuBar/MenuBar";
import { navLinksHTMLElement } from "../navLinks/NavLinks";
import App from "../../App";

export default function CurrentPage() {
  const [isMenuVisible, setMenuVisibility] = createSignal(false);

  function closeMenu(e: MouseEvent) {
    if (e.target !== navLinksHTMLElement && e.target !== menuBarHTMLElement) {
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
          <Route path={"/"} component={SalesService} />
          <Route path={"/manage-stocks"} component={ManageStocks} />
          <Route path={"/history"} component={History} />
          <Route path={"/stats"} component={Stats} />
          <Route path={"/settings"} component={Settings} />
        </Router>
      </div>
    </div>
  );
}
