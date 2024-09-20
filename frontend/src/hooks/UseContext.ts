import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useAppContext = () => {
  const { products, setProducts } = useContext(AppContext);

  return {
    products,
    setProducts,
  };
};
