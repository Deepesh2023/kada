import { createEffect, createSignal, onCleanup, Show } from "solid-js";

import "./currentPage.css";

import MenuBar, { menuBarHTMLElement } from "../menuBar/MenuBar";
import { navLinksHTMLElement } from "../navLinks/NavLinks";
import RouterOutlet from "../RouterOutlet";

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

      <div class="route-outlet">
        <RouterOutlet />
      </div>
    </div>
  );
}
