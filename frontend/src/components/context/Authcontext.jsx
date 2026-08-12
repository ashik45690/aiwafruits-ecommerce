import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await getCurrentUser();
       

console.log(response, "FULL RESPONSE");

setUser(response?.CurrentUserData);
      setUser(response?.CurrentUserData);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  return <AuthContext.Provider
  value={{
    user,
    setUser,
    loading,
  }}
>
  {children}
</AuthContext.Provider>;
}

export { AuthProvider };
