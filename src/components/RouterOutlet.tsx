import { Route, Router, Navigate } from "@solidjs/router";
import { lazy } from "solid-js";

const SalesAndService = lazy(
  () => import("../pages/sales-and-service/SalesAndService")
);

const Sales = lazy(() => import("../pages/sales/Sales"));
const Service = lazy(() => import("../pages/service/Service"));
const ManageStore = lazy(() => import("../pages/ManageStore"));
const History = lazy(() => import("../pages/History"));
const Stats = lazy(() => import("../pages/Stats"));
const Settings = lazy(() => import("../pages/Settings"));

export default function RouterOutlet() {
  return (
    <Router>
      <Route
        path={"/"}
        component={() => <Navigate href={"/sales-and-service"} />}
      />

      <Route path={"/sales-and-service"}>
        <Route path={"/"} component={SalesAndService} />
        <Route path={"sales"} component={Sales} />
        <Route path={"service"} component={Service} />
      </Route>

      <Route path={"/manage-store"} component={ManageStore} />
      <Route path={"/history"} component={History} />
      <Route path={"/stats"} component={Stats} />
      <Route path={"/settings"} component={Settings} />
    </Router>
  );
}
