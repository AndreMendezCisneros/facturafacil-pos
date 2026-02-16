import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Company {
  id: string;
  ruc: string;
  razon_social: string;
  subdomain: string;
}

interface AuthContextType {
  user: User | null;
  company: Company | null;
  companies: Company[];
  token: string | null;
  isAuthenticated: boolean;
  hasCompany: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectCompany: (company: Company) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_COMPANIES: Company[] = [
  { id: "1", ruc: "20512345678", razon_social: "Distribuidora Lima SAC", subdomain: "distrilima" },
  { id: "2", ruc: "20698765432", razon_social: "Comercial Andina EIRL", subdomain: "comercialandina" },
];

const MOCK_USER: User = {
  id: "1",
  name: "Carlos Mendoza",
  email: "carlos@distrilima.pe",
  role: "admin",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("pse_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [company, setCompany] = useState<Company | null>(() => {
    const saved = localStorage.getItem("pse_company");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("pse_token"));
  const [companies] = useState<Company[]>(MOCK_COMPANIES);

  const login = useCallback(async (email: string, _password: string) => {
    // POST /api/auth/login { email, password } → { token, user, companies }
    await new Promise((r) => setTimeout(r, 800));
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock";
    setUser(MOCK_USER);
    setToken(mockToken);
    localStorage.setItem("pse_user", JSON.stringify(MOCK_USER));
    localStorage.setItem("pse_token", mockToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCompany(null);
    setToken(null);
    localStorage.removeItem("pse_user");
    localStorage.removeItem("pse_company");
    localStorage.removeItem("pse_token");
  }, []);

  const selectCompany = useCallback((c: Company) => {
    // Stores X-Company-ID header for future API calls
    setCompany(c);
    localStorage.setItem("pse_company", JSON.stringify(c));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        companies,
        token,
        isAuthenticated: !!user && !!token,
        hasCompany: !!company,
        login,
        logout,
        selectCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
