import { Setter } from "solid-js";

import NavLinks from "../navbar/NavLinks";

import "./menuBar.css";

export default function MenuBar(props: { setMenuVisibility: Setter<boolean> }) {
  return (
    <div class="menu-bar">
      <NavLinks setMenuVisibility={props.setMenuVisibility} />
      <button id="menu-close" onclick={() => props.setMenuVisibility(false)}>
        close
      </button>
    </div>
  );
}
