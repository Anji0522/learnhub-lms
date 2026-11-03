import { ArrowUpRight, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await signOut();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" to="/" aria-label="LearnHub home"><span className="brand-icon"><BookOpen size={19} /></span>learnhub<span className="brand-dot">.</span></Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        <nav className={open ? "nav-links nav-open" : "nav-links"}>
          <NavLink to="/courses" onClick={() => setOpen(false)}>Explore</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>Our story</NavLink>
          {user ? <>
            <NavLink to="/dashboard" onClick={() => setOpen(false)}>My learning</NavLink>
            <button className="nav-avatar" onClick={logout} title="Sign out">{user.name?.slice(0, 1).toUpperCase()}<span className="avatar-tooltip">Sign out</span></button>
          </> : <>
            <Link className="nav-signin" to="/login" onClick={() => setOpen(false)}>Sign in</Link>
            <Link className="button button-dark nav-cta" to="/register" onClick={() => setOpen(false)}>Start learning <ArrowUpRight size={15} /></Link>
          </>}
        </nav>
      </div>
    </header>
  );
}
