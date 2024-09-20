import { createContext } from "react";

import { ProductsTableData } from "../services/Products";

export type AppContextProps = {
  products: ProductsTableData | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductsTableData | null>>;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
