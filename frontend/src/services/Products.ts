import { authenticatedFetch } from "./ValidateToken";

export interface DataItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface ProductsTableData {
  data: DataItem[];
}

export const getAllProducts = async (
  token: string | null
): Promise<ProductsTableData | null> => {

  
  const response = await authenticatedFetch(
    "http://0.0.0.0:8000/products/api/v1/products",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  const data: DataItem[] = responseJson.map((item: DataItem) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
  }));

  const tableData: ProductsTableData = {
    data,
  };

  return tableData;
};

export const editProduct = async (
  { id, name, description, price, category }: DataItem,
  token: string | null
) => {
  const jsonData = { name, description, price: price, category };

  const response = await authenticatedFetch(
    `http://0.0.0.0:8000/products/api/v1/products/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const createProduct = async (
  { name, description, price, category }: DataItem,
  token: string | null
) => {
  const jsonData = { name, description, price: price, category };

  const response = await authenticatedFetch(
    "http://0.0.0.0:8000/products/api/v1/products/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const deleteProduct = async (id: string, token: string | null) => {
  const response = await authenticatedFetch(
    `http://0.0.0.0:8000/products/api/v1/products/${id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("An unexpected error occurred");
  }
};
