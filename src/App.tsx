import { Route, Router } from "@solidjs/router";
import "./App.css";

import SalesService from "./pages/SalesService";
import ManageStocks from "./pages/ManageStocks";
import History from "./pages/History";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

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
          <a href="/sales-service">Sales/service</a>
        </li>
        <li>
          <a href="/manage-stocks">Manage stocks</a>
        </li>
        <li>
          <a href="/history">History</a>
        </li>
        <li>
          <a href="/stats">Stats</a>
        </li>
      </ul>

      <div>
        <a href="/settings">Settings</a>
      </div>
    </nav>
  );
}

function Page() {
  return (
    <div>
      <h1>Kada</h1>
      <Router>
        <Route path={"/sales-service"} component={SalesService} />
        <Route path={"/manage-stocks"} component={ManageStocks} />
        <Route path={"/history"} component={History} />
        <Route path={"/stats"} component={Stats} />
        <Route path={"/settings"} component={Settings} />
      </Router>
    </div>
  );
}
