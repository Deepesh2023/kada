import "./App.css";

import NavLinks from "./components/navbar/NavLinks";
import CurrentPage from "./components/currentPage/CurrentPage";

export default function App() {
  return (
    <div class="container">
      <div class="nav-bar">
        <NavLinks setMenuVisibility={null} />
      </div>

      <CurrentPage />
    </div>
  );
}
