export default function Navbar() {
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
