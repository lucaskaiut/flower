import { createContext, useEffect, useState } from "react";
import api from "../../api.json";

const INITIAL_VALUES = {
  isUserLogged: false,
  login: (email, password) => {},
  isLoading: true,
  logout: () => {},
  user: null
};

export const AuthContext = createContext(INITIAL_VALUES);

export function AuthContextProvider({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);

    setTimeout(() => {
      const data = api.login;
      setUser(data.user);
      localStorage.setItem("loginToken", data.token);
      setIsUserLogged(true);
    }, 1000);
    
    setIsLoading(false);
  };

  const logout = () => {
    setIsUserLogged(false);
    localStorage.removeItem('loginToken');
  }

  let contextValue = {
    isUserLogged,
    login,
    isLoading,
    logout,
    user,
  };



  const verifyIfIsLogged = () => {
    const token = localStorage.getItem('loginToken');
    if (!token) {
      logout();
      return;
    }

    const data = api.me;
    if (!data.user) {
      logout();
      return;
    }

    setUser(data.user);
    setIsUserLogged(true);
  }

  useEffect(() => {
    setIsLoading(true);
    verifyIfIsLogged();
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
