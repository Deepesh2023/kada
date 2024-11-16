import { Index } from "solid-js";
import "./navbar.css";

interface NavbarItems {
  name: string;
  link: string;
}

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

export default function Navbar() {
  return (
    <nav class="navbar">
      <ul>
        <Index each={navbarItems}>
          {(navbarItem) => (
            <li>
              <a href={navbarItem().link}>{navbarItem().name}</a>
            </li>
          )}
        </Index>
      </ul>

      <div>
        <a href="/settings">Settings</a>
      </div>
    </nav>
  );
}
