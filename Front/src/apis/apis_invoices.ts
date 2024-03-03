import axios from "axios";
import { Invoice, ProductInvoice } from "../../types/invoice";
import {  invoiceUrl } from "./config";

export const getInvoicesFromDataBase = async () => {
  try {
    const response = await axios.get(invoiceUrl + "/get");
    return response.data;
  } catch (error) {
    console.error("Error en getinvoices:", error);
    throw error; 
  }
};

export const getInvoiceFromDataBaseById = async (Id:number) => {
  try {
    const response = await axios.get(invoiceUrl + "/getbyid", { params: { Id } });
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
    const response = await axios.post(invoiceUrl + "/post", invoice);
    return response.data;
  } catch (error) {
    console.error("Error en addinvoices:", error);
    throw error;
  }
};

export const editInvoiceFromDataBase = async (invoice: Invoice) => {
  try {
    const response = await axios.put(invoiceUrl+ "/put", invoice);
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
};


export const addInvoiceProductFromDataBase = async (productInvoice: ProductInvoice, InvoiceId: number) => {
  try {
    const response = await axios.put(invoiceUrl + "/post/product", {productInvoice,InvoiceId } );
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}

export const editInvoiceProductFromDataBase = async (productInvoice: ProductInvoice, InvoiceId: number) => {
  try {
    const response = await axios.put(invoiceUrl + "/put/product", {productInvoice,InvoiceId } );
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}

export const removeInvoiceProductFromDataBase = async (productId: number, InvoiceId: number) => {
  try {
    const response = await axios.delete(`${invoiceUrl}/put/product?productId=${productId}&InvoiceId=${InvoiceId}`);
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}
export const removeInvoiceFromDataBase = async ( InvoiceId: number) => {
  try {
    const response = await axios.delete(invoiceUrl+"/delete", { params: { InvoiceId } });
    return response.data;
  } catch (error) {
    console.error("Error en editInvoices:", error);
    throw error;
  }
}