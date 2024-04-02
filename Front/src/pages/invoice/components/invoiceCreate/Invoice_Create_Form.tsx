import React, { useState } from "react";
import { useStore } from "../../../../contexts/StoreContext";
import { Customer } from "../../../../../types/customer";
import { Product } from "../../../../../types/product";
import ClientSearch from "./ClientSearch";
import ClientDetails from "./ClientDetails";
import ProductSearch from "./ProductSearch";
import ProductList from "./ProductList";

interface InvoiceCreateFormProps {
  onClose: () => void;
}

const InvoiceCreateForm: React.FC<InvoiceCreateFormProps> = ({ onClose }) => {
  const { customers, products, addInvoice } = useStore();
  const [selectedClient, setSelectedClient] = useState<Customer | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [invoiceFormData, setInvoiceFormData] = useState({
    Id: null,
    Date: new Date(),
    ClientId: null,
    Products: [],
    Total: 0,
  });

  const handleSelectClient = (client: Customer) => {
    setSelectedClient(client);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleRemoveProduct = (product: Product) => {
    setSelectedProducts(selectedProducts.filter((p) => p.Id !== product.Id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) {
      console.error("Seleccione un cliente antes de enviar el formulario.");
      return;
    }
    try {
      addInvoice(invoiceFormData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl grid gap-4 py-10 px-8 sm:grid-cols-2 bg-white rounded-md">
      <ClientSearch customers={customers} onSelectClient={handleSelectClient} />
      <ClientDetails selectedClient={selectedClient} />
      <ProductSearch products={products} onSelectProduct={handleSelectProduct} />
      <ProductList
        selectedProducts={selectedProducts}
        onRemoveProduct={handleRemoveProduct}
      />
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-700"
          disabled={!selectedClient}
        >
          Aceptar
        </button>
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-6 ml-4 rounded-md hover:bg-red-700"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default InvoiceCreateForm;