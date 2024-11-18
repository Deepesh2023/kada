import { Index } from "solid-js";

import { NavLinkType } from "../../types";
import { Setter } from "solid-js/types/server/reactive.js";

import "./navLinks.css";

const navLinks: NavLinkType[] = [
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

export let navLinksComponent: undefined | HTMLElement;

export default function NavLinks(props: {
  setMenuVisibility: null | Setter<boolean>;
}) {
  // can close the menubar when on narrow screens
  function closeMenu() {
    if (props.setMenuVisibility) {
      props.setMenuVisibility(false);
    }
  }

  return (
    <nav class="navbar" ref={(el) => (navLinksComponent = el)}>
      <ul>
        <Index each={navLinks}>
          {(navLink) => (
            <li onclick={closeMenu}>
              <a href={navLink().link}>{navLink().name}</a>
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
