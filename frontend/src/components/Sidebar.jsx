import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user, signOut } = useAuth();
  return (
    <aside className="dashboard-sidebar">
      <div className="side-user">
        <span className="user-avatar">
          {user?.name?.slice(0, 1).toUpperCase()}
        </span>
        <div>
          <strong>{user?.name}</strong>
          <small>{user?.role}</small>
        </div>
      </div>
      <span className="side-label">YOUR SPACE</span>
      <NavLink end to="/dashboard">
        <LayoutDashboard size={17} /> Overview
      </NavLink>
      <NavLink to="/dashboard/courses">
        <BookOpen size={17} />{" "}
        {user?.role === "instructor" ? "My courses" : "My learning"}
      </NavLink>
      {user?.role === "admin" && (
        <NavLink to="/dashboard/admin">
          <Users size={17} /> Admin
        </NavLink>
      )}
      <span className="side-label side-label-bottom">ACCOUNT</span>
      <button className="side-logout" onClick={signOut}>
        <LogOut size={17} /> Sign out
      </button>
    </aside>
  );
}
