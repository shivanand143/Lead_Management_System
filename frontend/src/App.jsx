import { Link, Outlet } from "react-router-dom";
import "./styles.css";

export default function App() {
  return (
    <div>
      <header className="navbar">
        <div className="nav-left">
          <h1>Leads Management</h1>
        </div>
        <div className="nav-right">
          <Link to="/">Leads</Link>
          <Link to="/new">New Lead</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
}
