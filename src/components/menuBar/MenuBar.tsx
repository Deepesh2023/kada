import { Setter } from "solid-js";

import Navbar from "../navbar/Navbar";

import "./menuBar.css";

export default function MenuBar(props: { setMenuVisibility: Setter<boolean> }) {
  return (
    <div class="menu-bar">
      <Navbar setMenuVisibility={props.setMenuVisibility} />
      <button id="menu-close" onclick={() => props.setMenuVisibility(false)}>
        close
      </button>
    </div>
  );
}
