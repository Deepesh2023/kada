import { Index } from "solid-js";

import { NavLinkPropType, NavLinkType } from "../../types";

import "./navLinks.css";

const navLinks: NavLinkType[] = [
  {
    name: "Sales/service",
    link: "/",
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

export let navLinksHTMLElement: undefined | HTMLElement;

export default function NavLinks(props: NavLinkPropType) {
  // can close the menubar when on narrow screens
  function closeMenu() {
    if (props.setMenuVisibility) {
      props.setMenuVisibility(false);
    }
  }

  return (
    <nav class="navbar" ref={(el) => (navLinksHTMLElement = el)}>
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
