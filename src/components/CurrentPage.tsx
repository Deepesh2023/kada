import { Route, Router } from "@solidjs/router";

import SalesService from "../pages/SalesService";
import ManageStocks from "../pages/ManageStocks";
import History from "../pages/History";
import Stats from "../pages/Stats";
import Settings from "../pages/Settings";

export default function CurrentPage() {
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
