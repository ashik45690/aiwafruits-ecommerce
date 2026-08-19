import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../../services/cartService";
import { AuthContext } from "./Authcontext";

const Cartcontext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const { user, loading: authLoading } = useContext(AuthContext);

  const fetchCartData = async () => {
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