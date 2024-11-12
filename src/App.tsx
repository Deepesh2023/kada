import "./App.css";

export default function App() {
  return (
    <div class="container">
      <Navigation />
      <Page />
    </div>
  );
}

function Navigation() {
  return (
    <nav class="navbar">
      <ul>
        <li>
          <a href="">Sale/service</a>
        </li>
        <li>
          <a href="">Manage stock</a>
        </li>
        <li>
          <a href="">History</a>
        </li>
        <li>
          <a href="">Stats</a>
        </li>
      </ul>

      <div>
        <a href="">Settings</a>
      </div>
    </nav>
  );
}

function Page() {
  return (
    <div>
      <h1>Kada</h1>
    </div>
  );
}
