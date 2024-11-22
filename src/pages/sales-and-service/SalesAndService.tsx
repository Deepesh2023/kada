import { A } from "@solidjs/router";
import "./salesAndService.css";

export default function SalesAndService() {
  return (
    <div class="sales-service-page" data-testid="sales-service-page">
      <h2>Sales and service</h2>

      <ul>
        <li>
          <A href="sales">Sales</A>
        </li>
        <li>
          <A href="service">Service</A>
        </li>
      </ul>
    </div>
  );
}
