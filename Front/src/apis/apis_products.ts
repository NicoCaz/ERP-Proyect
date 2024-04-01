import axios from "axios";
import { Product } from "../../types/product";
import { baseURL } from "./config";

export const getProductsFromDataBase = async () => {
  try {
    const response = await axios.get(baseURL + "/product/get");
    return response.data;
  } catch (error) {
    console.error("Error en getCustomers:", error);
    throw error; // Puedes relanzar el error para manejarlo en el lugar donde llamas a la función
  }
};

export const addProductFromDataBase = async (
  product: Product
): Promise<Product> => {
  try {
    const response = await axios.post(baseURL + "/product/post", product);
    return response.data;
  } catch (error) {
    console.error("Error en addProduct:", error);
    throw error;
  }
};

export const editProductFromDataBase = async (product: Product) => {
  try {
    const response = await axios.put(baseURL + "/product/put", product);
    return response.data;
  } catch (error) {
    console.error("Error en editProduct:", error);
    throw error;
  }
};

export const deleteProductFromDatabase = async (product: Product) => {
  try {
    const response = await axios.delete(`${baseURL}/product/delete/${product.Id}`);
    return response.data;
  } catch (error) {
    console.error("Error en deleteProductFromDatabase:", error);
    throw error;
  }
};