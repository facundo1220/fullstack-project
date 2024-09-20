import { useState } from "react";
import { AppContext } from "./AppContext";
import { ProductsTableData } from "../services/Products";

interface props {
  children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: props) => {
  const [products, setProducts] = useState<ProductsTableData | null>(null);

  return (
    <AppContext.Provider value={{ products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};
