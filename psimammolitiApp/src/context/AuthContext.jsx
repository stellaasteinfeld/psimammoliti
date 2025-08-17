import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const SESSION_KEY = "app.session";

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const s = loadSession();
    if (s?.expiresAt && s.expiresAt <= Date.now()) return null;
    return s;
  });

  useEffect(() => {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [session]);

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 400));
    if (email !== "demo@demo.com" || password !== "123456") {
      throw new Error("Credenciales inválidas");
    }
    const token = crypto.randomUUID?.() || String(Math.random());
    const eightHours = 1000 * 60 * 60 * 8;
    setSession({ token, user: { email }, expiresAt: Date.now() + eightHours });
  };

  const logout = () => setSession(null);

  const isAuthenticated =
    !!session && (!session.expiresAt || session.expiresAt > Date.now());

  useEffect(() => {
    if (!session?.expiresAt) return;
    const ms = session.expiresAt - Date.now();
    if (ms <= 0) return setSession(null);
    const t = setTimeout(() => setSession(null), ms);
    return () => clearTimeout(t);
  }, [session?.expiresAt]);

  const value = {
    session,
    user: session?.user ?? null,
    token: session?.token ?? null,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};
