import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { user: current } = await api("/auth/me");
      setUser(current);
    } catch (error) {
      if (error.status !== 401) console.error("Could not restore the LearnHub session.", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const value = useMemo(() => ({
    user,
    loading,
    async signIn(credentials) {
      const result = await api("/auth/login", { method: "POST", body: credentials });
      setUser(result.user);
      return result.user;
    },
    async signUp(details) {
      const result = await api("/auth/register", { method: "POST", body: details });
      setUser(result.user);
      return result.user;
    },
    async signOut() {
      await api("/auth/logout", { method: "POST" });
      setUser(null);
    },
    refresh
  }), [user, loading, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
