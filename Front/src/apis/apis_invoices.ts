import axios from "axios";
import { Invoice, ProductInvoice } from "../../types/invoice";
import {  baseURL } from "./config";

export const getInvoicesFromDataBase = async () => {
  try {
    const response = await axios.get(baseURL + "/get");
    return response.data;
  } catch (error) {
    console.error("Error en getinvoices:", error);
    throw error; 
  }
};

export const getInvoiceFromDataBaseById = async (Id:number) => {
  try {
    const response = await axios.get(baseURL + "/getbyid", { params: { Id } });
    return response.data;
  } catch (error) {
    console.error("Error en getinvoices:", error);
    throw error; 
  }
};


export const addInvoicesFromDataBase = async (
  invoice: Invoice
): Promise<Invoice> => {
  try {
    const response = await axios.post(baseURL + "/post", invoice);
    return response.data;
  } catch (error) {
    console.error("Error en addinvoices:", error);
    throw error;
  }
};

export const editInvoiceFromDataBase = async (invoice: Invoice) => {
  try {
    const response = await axios.put(baseURL+ "/put", invoice);
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
};


export const addInvoiceProductFromDataBase = async (productInvoice: ProductInvoice, InvoiceId: number) => {
  try {
    const response = await axios.put(baseURL + "/post/product", {productInvoice,InvoiceId } );
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}

export const editInvoiceProductFromDataBase = async (productInvoice: ProductInvoice, InvoiceId: number) => {
  try {
    const response = await axios.put(baseURL + "/put/product", {productInvoice,InvoiceId } );
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}

export const removeInvoiceProductFromDataBase = async (productId: number, InvoiceId: number) => {
  try {
    const response = await axios.delete(`${baseURL}/put/product?productId=${productId}&InvoiceId=${InvoiceId}`);
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}
export const removeInvoiceFromDataBase = async ( InvoiceId: number) => {
  try {
    const response = await axios.delete(baseURL+"/delete", { params: { InvoiceId } });
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}