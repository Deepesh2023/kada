import { Index } from "solid-js";

import { NavbarItems } from "../../types";

import "./navbar.css";
import { Setter } from "solid-js/types/server/reactive.js";

const navbarItems: NavbarItems[] = [
  {
    name: "Sales/Service",
    link: "/sales-service",
  },
  {
    name: "Manage stocks",
    link: "/manage-stocks",
  },
  {
    name: "history",
    link: "/history",
  },
  {
    name: "Stats",
    link: "/stats",
  },
];

export let navbar: undefined | HTMLElement;

export default function Navbar(props: {
  setMenuVisibility: null | Setter<boolean>;
}) {
  // can close the menubar when on narrow screens
  function closeMenu() {
    if (props.setMenuVisibility) {
      props.setMenuVisibility(false);
    }
  }

  return (
    <nav class="navbar" ref={(el) => (navbar = el)}>
      <ul>
        <Index each={navbarItems}>
          {(navbarItem) => (
            <li onclick={closeMenu}>
              <a href={navbarItem().link}>{navbarItem().name}</a>
            </li>
          )}
        </Index>
      </ul>

      <div onclick={closeMenu}>
        <a href="/settings">Settings</a>
      </div>
    </nav>
  );
}
