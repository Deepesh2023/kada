import "./App.css";

import Navbar from "./components/navbar/Navbar";
import CurrentPage from "./components/currentPage/CurrentPage";

export default function App() {
  return (
    <div class="container">
      <div class="navbar-container">
        <Navbar />
      </div>
      
      <CurrentPage />
    </div>
  );
}
