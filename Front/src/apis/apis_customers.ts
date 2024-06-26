import axios from "axios";
import { Customer } from "../../types/customer";
import { baseURL } from "./config";

export const getCustomersFromDataBase = async () => {
  try {
    const response = await axios.get(baseURL + "/cliente/get");
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
    const response = await axios.post(baseURL + "/cliente/post", customer);
    return response.data;
  } catch (error) {
    console.error("Error en addCustomers:", error);
    throw error;
  }
};

export const editCustomerFromDataBase = async (customer: Customer) => {
  try {
    const response = await axios.put(baseURL + "/cliente/put", customer);
    return response.data;
  } catch (error) {
    console.error("Error en editCustomers:", error);
    throw error;
  }
};
export const deleteCustomerFromDataBase = async (customer: Customer) => {
  try {
    const response = await axios.delete(`${baseURL}/cliente/delete/${customer.Id}`);
    return response.data;
  } catch (error) {
    console.error("Error en deleteCustomer:", error);
    throw error;
  }
};