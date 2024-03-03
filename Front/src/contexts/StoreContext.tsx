import React, { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "../../types/customer";
import { Product } from "../../types/product";
import { Invoice, ProductInvoice } from "../../types/invoice";
import {
  getCustomersFromDataBase,
  editCustomerFromDataBase,
  addCustomerFromDataBase,
} from "../apis/apis_customers";

import {
  addProductFromDataBase,
  editProductFromDataBase,
  getProductsFromDataBase,
} from "../apis/apis_products";
import { addInvoiceProductFromDataBase, addInvoicesFromDataBase, editInvoiceFromDataBase, editInvoiceProductFromDataBase, getInvoicesFromDataBase, removeInvoiceProductFromDataBase } from "../apis/apis_invoices";

interface StoreContextProps {
  customers: Customer[];
  products: Product[];
  invoices: Invoice[];
  addCustomer: (customer: Customer) => void;
  editCustomer: (customer: Customer) => void;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  addInvoice: (invoice: Invoice) => void;
}

const StoreContext = createContext<StoreContextProps>({
  customers: [],
  products: [],
  invoices: [],
  addCustomer: () => {},
  editCustomer: () => {},
  addProduct: () => {},
  editProduct: () => {},
  addInvoice: () => {},
});

export const useStore = () => useContext(StoreContext);

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [actInvoice,setActInvoice]=useState<Invoice>();
  const [productActInvoice,setProductActInvoice]=useState<ProductInvoice[]>([]);
  const [editProductActInvoice,setEditProductActInvoice]=useState<ProductInvoice[]>([]);

  const handlerCustomers = async () => {
    try {
      const customersData = await getCustomersFromDataBase();
      setCustomers(customersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlerProducts = async () => {
    try {
      const productsData = await getProductsFromDataBase();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlerInvoices = async () => {
    try {
      const invoicesData = await getInvoicesFromDataBase();
      setInvoices(invoicesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    handlerCustomers();
    handlerProducts();
    handlerInvoices();
  }, []);
  ////////////////////////////////////////////////////////////////////////////

  const addCustomer = (customer: Customer) => {
    try {
      addCustomerFromDataBase(customer);
      setCustomers((prevCustomers) => [...prevCustomers, customer]);
    } catch (error) {
      console.error("Error al crear un cliente:", error);
    }
  };

  const editCustomer = (updatedCustomer: Customer) => {
    try {
      editCustomerFromDataBase(updatedCustomer);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.Id === updatedCustomer.Id
            ? { ...customer, ...updatedCustomer }
            : customer
        )
      );
    } catch (error) {
      console.error("Error al editar un cliente:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////

  const addProduct = (product: Product) => {
    try {
      addProductFromDataBase(product);
      setProducts((prevProducts) => [...prevProducts, product]);
    } catch (error) {
      console.error("Error al crear un Product:", error);
    }
  };

  const editProduct = (updatedProduct: Product) => {
    try {
      editProductFromDataBase(updatedProduct);
      setProducts((prevCustomers) =>
        prevCustomers.map((product) =>
          product.Id === updatedProduct.Id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
    } catch (error) {
      console.error("Error al editar un cliente:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////

  const loadCurentInvoice = (invoice:Invoice) => {
    try {
      setActInvoice(invoice);
      setProductActInvoice(invoice.Products);
    } catch (error) {
      console.error("Error al crear un Product:", error);
    }
  };
  const addInvoice = (invoice: Invoice) => {
    try {
      addInvoicesFromDataBase(invoice);
      setInvoices((prevInvoices) => [...prevInvoices, invoice]);
    } catch (error) {
      console.error("Error al crear un Product:", error);
    }
  };

  const editInvoice = (updatedInvoice: Invoice) => {
    try {
      editInvoiceFromDataBase(updatedInvoice);
      setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.Id === updatedInvoice.Id
            ? { ...invoice, ...updatedInvoice }
            : invoice
        )
      );
    } catch (error) {
      console.error("Error al editar un cliente:", error);
    }
  };

  const addProductToInvoice = (productInvoice: ProductInvoice,invoiceId:number) => {
    try {
      addInvoiceProductFromDataBase(productInvoice,invoiceId);
      setProductActInvoice((prevProdInvoices) => [...prevProdInvoices, productInvoice]);  
    } catch (error) {
      console.error("Error al crear un Product:", error);
    }
  };

  const updateInvoiceTotal = () => {
    try {
      let total = 0;
    productActInvoice.forEach(product => {
      total += product.Price * product.Quantity;
    });
    actInvoice!.Total = total;  
    } catch (error) {
        console.error("Error al crear un Product:", error);
    }
    
  };

  const editProductToInvoice = (productInvoice: ProductInvoice,invoiceId:number) => {
    try {
      editInvoiceProductFromDataBase(productInvoice,invoiceId);
      setEditProductActInvoice((prevProdInvoice) => 
      prevProdInvoice.map((product) =>
          product.Id === productInvoice.Id
            ? { ...product, ...productInvoice }
            : product
        ))
      updateInvoiceTotal();
    } catch (error) {
      console.error("Error al crear un Product:", error);
    }
  };
  const removeProductFromInvoice = (productId: number, invoiceId: number) => {
    try {
      removeInvoiceProductFromDataBase(productId, invoiceId);
      setEditProductActInvoice((prevProdInvoice) =>
        prevProdInvoice.filter((product) => product.Id !== productId)
      );
      updateInvoiceTotal();
    } catch (error) {
      console.error("Error al eliminar un producto:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////


  const contextValue: StoreContextProps = {
    customers,
    products,
    invoices,
    addCustomer,
    editCustomer,
    addProduct,
    editProduct,
    addInvoice, 
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
