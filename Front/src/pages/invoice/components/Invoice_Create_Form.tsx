import React, { useState } from "react";
import { useStore } from "../../../contexts/StoreContext";
import { Customer } from "../../../../types/customer";
import { Product } from "../../../../types/product";
interface InvoiceCreateFormProps {
  onClose: () => void;
}

const InvoiceCreateForm: React.FC<InvoiceCreateFormProps> = ({ onClose }) => {
  const { customers, products, addInvoice } = useStore();
  const [searchInput, setSearchInput] = useState("");
  const [selectedClient, setSelectedClient] = useState<Customer | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState("");

  const [invoiceFormData, setInvoiceFormData] = useState({
    Id: null,
    Date: new Date(),
    ClientId: null,
    Products: [],
    Total: 0,
  });

  const [clientFormData, setClientFormData] = useState({
    ClientId: 0,
    Name: "",
    Address: "",
  });

  const filteredCustomers = customers.filter((client) =>
    client.Name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleProductSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearch(e.target.value);
  };

  const handleSelectClient = (client: Customer) => {
    setSelectedClient(client);
    setClientFormData({
      ClientId: client.Id!,
      Name: client.Name,
      Address: client.Address,
    });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
    setProductSearch("");
  };

  const handleClearSelection = () => {
    setSelectedClient(null);
    setClientFormData({
      ClientId: 0,
      Name: "",
      Address: "",
    });
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
      <div className="mb-4">
        <label htmlFor="searchInput" className="block mb-2">Buscar cliente:</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Ingrese el nombre del cliente..."
          value={searchInput}
          onChange={handleSearchInputChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {selectedClient === null && (
          <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md">
            {filteredCustomers.map((client: Customer) => (
              <li
                key={client.Id}
                onClick={() => handleSelectClient(client)}
                className={`px-3 py-2 cursor-pointer bg-gray-200"}`}
              >
                {client.Name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="mb-4">
          <label htmlFor="nameInput" className="block mb-2">Nombre:</label>
          <div className="flex items-center">
            <input
              type="text"
              id="nameInput"
              value={clientFormData.Name}
              disabled
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              placeholder="Nombre del cliente"
            />
            {selectedClient && (
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={handleClearSelection}
              >
                &#10006;
              </button>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="addressInput" className="block mb-2">Dirección:</label>
          <input
            type="text"
            id="addressInput"
            value={clientFormData.Address}
            disabled
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            placeholder="Dirección del cliente"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="productSearch" className="block mb-2">
          Buscar producto:
        </label>
        <input
          type="text"
          id="productSearch"
          placeholder="Ingrese el nombre del producto..."
          value={productSearch}
          onChange={handleProductSearchChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md">
          {filteredProducts.map((product) => (
            <li
              key={product.Id}
              onClick={() => handleSelectProduct(product)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {product.Name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label htmlFor="selectedProducts" className="block mb-2">
          Productos seleccionados:
        </label>
        <ul className="border border-gray-300 rounded-md">
          {selectedProducts.map((product) => (
            <li
              key={product.Id}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-200"
            >
              <span>{product.Name}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveProduct(product)}
              >
                &#10006;
              </button>
            </li>
          ))}
        </ul>
      </div>

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