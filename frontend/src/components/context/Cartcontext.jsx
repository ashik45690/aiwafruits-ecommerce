import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../../services/cartService";
import { AuthContext } from "./Authcontext";

const Cartcontext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const { user, loading: authLoading } = useContext(AuthContext);

  const fetchCartData = async () => {
    // User login ചെയ്തിട്ടില്ലെങ്കിൽ cart fetch ചെയ്യേണ്ട
    if (!user) {
      setCart([]);
      return;
    }

    try {
      const response = await getCart();

      if (response.success) {
        setCart(response.cart.items);
      }
    } catch (error) {
      console.log(error);
      setCart([]);
    }
  };

  useEffect(() => {
    // Auth check complete ആയതിന് ശേഷം മാത്രം cart fetch ചെയ്യുക
    if (!authLoading) {
      fetchCartData();
    }
  }, [user, authLoading]);

  return (
    <Cartcontext.Provider
      value={{
        cart,
        setCart,
        fetchCartData,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}

export const userCart = () => useContext(Cartcontext);