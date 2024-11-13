import "./App.css";

import Navbar from "./components/navbar/Navbar";
import CurrentPage from "./components/currentPage/CurrentPage";

export default function App() {
  return (
    <div class="container">
      <Navbar />
      <CurrentPage />
    </div>
  );
}
