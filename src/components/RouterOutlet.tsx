import { Route, Router, Navigate } from "@solidjs/router";
import { lazy } from "solid-js";

const SalesAndService = lazy(
  () => import("../pages/sales-and-service/SalesAndService")
);

import Sales from "../pages/sales/Sales";
import ViewAllProducts from "../pages/view-all-products/viewAllProducts";
const Service = lazy(() => import("../pages/service/Service"));
const ManageStore = lazy(() => import("../pages/manage-store/ManageStore"));
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

      <Route path={"/manage-store"}>
        <Route path={"/"} component={ManageStore} />
        <Route path={"view-all-products"} component={ViewAllProducts} />
      </Route>

      <Route path={"/history"} component={History} />
      <Route path={"/stats"} component={Stats} />
      <Route path={"/settings"} component={Settings} />
    </Router>
  );
}
