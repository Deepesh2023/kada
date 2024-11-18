import { Setter } from "solid-js";

import NavLinks from "../navLinks/NavLinks";

import "./menuBar.css";

export let menuBarHTMLElement: undefined | HTMLDivElement;

export default function MenuBar(props: { setMenuVisibility: Setter<boolean> }) {
  return (
    <div class="menu-bar" ref={(el) => (menuBarHTMLElement = el)}>
      <NavLinks setMenuVisibility={props.setMenuVisibility} />
      <button id="menu-close" onclick={() => props.setMenuVisibility(false)}>
        close
      </button>
    </div>
  );
}
