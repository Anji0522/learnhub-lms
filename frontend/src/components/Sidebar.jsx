import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      <button
        className="sidebar-mobile-toggle"
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
      >
        <span>
          <Menu size={17} />
          Dashboard menu
        </span>
        {mobileOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
      </button>
      <aside
        className={
          mobileOpen ? "dashboard-sidebar sidebar-open" : "dashboard-sidebar"
        }
      >
        <Link className="sidebar-brand" to="/">
          <span className="sidebar-brand-icon">
            <BookOpen size={18} />
          </span>
          LearnHub
        </Link>
        <span className="side-label">WORKSPACE</span>
        <NavLink end to="/dashboard" onClick={() => setMobileOpen(false)}>
          <LayoutDashboard size={17} />
          <span>Overview</span>
        </NavLink>
        {user?.role === "instructor" ? (
          <a
            className="sidebar-current"
            href="#my-courses"
            onClick={() => setMobileOpen(false)}
          >
            <BookOpen size={17} />
            <span>My courses</span>
          </a>
        ) : user?.role === "admin" ? (
          <a
            className="sidebar-current"
            href="#admin-overview"
            onClick={() => setMobileOpen(false)}
          >
            <Users size={17} />
            <span>Admin overview</span>
          </a>
        ) : (
          <a
            className="sidebar-current"
            href="#my-learning"
            onClick={() => setMobileOpen(false)}
          >
            <BookOpen size={17} />
            <span>My learning</span>
          </a>
        )}
        <span className="side-label side-label-bottom">ACCOUNT</span>
        <div className="sidebar-account">
          <span className="sidebar-account-icon">
            {user?.name?.slice(0, 1).toUpperCase()}
          </span>
          <div className="sidebar-account-details">
            <strong>{user?.name}</strong>
            <small>{user?.role}</small>
          </div>
          <button
            className="side-logout"
            type="button"
            onClick={signOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>
    </>
  );
}
