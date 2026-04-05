"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<{ token: string; name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name") || "";
    if (token) setUser({ token, name });
  }, []);

  const login = (token: string, refresh_token: string, name: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("refresh_token", refresh_token)
    localStorage.setItem("name", name)
    setUser({ token, name })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("name")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
};
