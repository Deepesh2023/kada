import { Navigate, Route, Router } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";

import "./currentPage.css";

import SalesAndService from "../../pages/sales-and-service/SalesAndService";
import ManageStore from "../../pages/ManageStore";
import History from "../../pages/History";
import Stats from "../../pages/Stats";
import Settings from "../../pages/Settings";
import Sales from "../../pages/sales/Sales";
import Service from "../../pages/service/Service";

import MenuBar, { menuBarHTMLElement } from "../menuBar/MenuBar";
import { navLinksHTMLElement } from "../navLinks/NavLinks";

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
          <Route
            path={"/"}
            component={() => <Navigate href={"/sales-and-service"} />}
          />

          <Route path={"/sales-and-service"}>
            <Route path={"/"} component={SalesAndService} />
            <Route path={"sales"} component={Sales} />
            <Route path={"service"} component={Service} />
          </Route>

          <Route path={"/manage-store"} component={ManageStore} />
          <Route path={"/history"} component={History} />
          <Route path={"/stats"} component={Stats} />
          <Route path={"/settings"} component={Settings} />
        </Router>
      </div>
    </div>
  );
}
