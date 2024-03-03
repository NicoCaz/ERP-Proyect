import axios from "axios";
import { Customer } from "../../types/customer";
import { customerUrl } from "./config";

export const getCustomersFromDataBase = async () => {
  try {
    const response = await axios.get(customerUrl + "/get");
    return response.data;
  } catch (error) {
    console.error("Error en getCustomers:", error);
    throw error; // Puedes relanzar el error para manejarlo en el lugar donde llamas a la función
  }
};

export const addCustomerFromDataBase = async (
  customer: Customer
): Promise<Customer> => {
  try {
    const response = await axios.post(customerUrl + "/post", customer);
    return response.data;
  } catch (error) {
    console.error("Error en addCustomers:", error);
    throw error;
  }
};

export const editCustomerFromDataBase = async (customer: Customer) => {
  try {
    const response = await axios.put(customerUrl + "/put", customer);
    return response.data;
  } catch (error) {
    console.error("Error en editCustomers:", error);
    throw error;
  }
};
