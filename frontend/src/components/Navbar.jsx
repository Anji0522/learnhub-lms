import {
  ArrowUpRight,
  Bell,
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function getInitialTheme() {
  return localStorage.getItem("learnhub-theme") === "dark" ? "dark" : "light";
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("learnhub-theme", theme);
    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        theme === "dark" ? "#0b1120" : "#f7f8fc",
      );
    }
  }, [theme]);

  async function logout() {
    await signOut();
    setProfileOpen(false);
    setOpen(false);
    navigate("/");
  }

  function submitSearch(event) {
    event.preventDefault();
    const query = search.trim();
    navigate(
      query ? `/courses?search=${encodeURIComponent(query)}` : "/courses",
    );
    setOpen(false);
  }

  function closeMenus() {
    setProfileOpen(false);
    setNotificationsOpen(false);
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link
          className="brand"
          to="/"
          aria-label="LearnHub home"
          onClick={closeMenus}
        >
          <span className="brand-icon">
            <BookOpen size={19} />
          </span>
          <span>
            LearnHub<span className="brand-dot">.</span>
          </span>
        </Link>

        <form className="nav-search" role="search" onSubmit={submitSearch}>
          <Search size={16} aria-hidden="true" />
          <input
            aria-label="Search courses"
            placeholder="Search courses"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit" aria-label="Submit course search">
            <ArrowUpRight size={15} />
          </button>
        </form>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? "nav-links nav-open" : "nav-links"}>
          <NavLink to="/courses" onClick={closeMenus}>
            Explore
          </NavLink>
          <NavLink to="/learn/mern" onClick={closeMenus}>
            Learn MERN
          </NavLink>
          <NavLink to="/about" onClick={closeMenus}>
            About
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenus}>
                My learning
              </NavLink>
              <div className="nav-popover-wrap">
                <button
                  className="icon-button notification-button"
                  type="button"
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileOpen(false);
                  }}
                >
                  <Bell size={18} />
                  <span className="notification-dot" />
                </button>
                {notificationsOpen && (
                  <div className="nav-popover notification-popover">
                    <strong>You’re all caught up</strong>
                    <p>New course updates will show up here.</p>
                  </div>
                )}
              </div>
              <button
                className="icon-button theme-toggle"
                type="button"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                onClick={() =>
                  setTheme((current) => (current === "dark" ? "light" : "dark"))
                }
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="nav-popover-wrap">
                <button
                  className="nav-profile"
                  type="button"
                  aria-expanded={profileOpen}
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotificationsOpen(false);
                  }}
                >
                  <span className="nav-avatar">
                    {user.name?.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="nav-profile-name">{user.name}</span>
                  <ChevronDown size={14} />
                </button>
                {profileOpen && (
                  <div className="nav-popover profile-popover">
                    <strong>{user.name}</strong>
                    <span className="profile-role">{user.role}</span>
                    <Link to="/dashboard" onClick={closeMenus}>
                      My dashboard
                    </Link>
                    <button type="button" onClick={logout}>
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="icon-button theme-toggle"
                type="button"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                onClick={() =>
                  setTheme((current) => (current === "dark" ? "light" : "dark"))
                }
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link className="nav-signin" to="/login" onClick={closeMenus}>
                Sign in
              </Link>
              <Link
                className="button button-dark nav-cta"
                to="/register"
                onClick={closeMenus}
              >
                Create account <ArrowUpRight size={15} />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
