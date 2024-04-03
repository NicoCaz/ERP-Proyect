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
     addInvoice({
       ...invoiceFormData,
       ClientId: selectedClient.Id,
       Products: selectedProducts.map(p => p.Id),
     });
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
   <form
     onSubmit={handleSubmit}
     className="max-w-3xl grid gap-4 py-10 px-8 sm:grid-cols-2 bg-white rounded-md"
   >
     {/* Search Client */}
     <div className="form-control">
       <label htmlFor="searchInput" className="label">
         <span className="label-text">Buscar cliente:</span>
       </label>
       <input
         id="searchInput"
         placeholder="Ingrese el nombre del cliente..."
         value={searchInput}
         onChange={handleSearchInputChange}
         className="input input-bordered w-full"
       />
       {selectedClient === null && (
         <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md">
           {filteredCustomers.map((client: Customer) => (
             <li
               key={client.Id}
               onClick={() => handleSelectClient(client)}
               className="px-3 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300"
             >
               {client.Name}
             </li>
           ))}
         </ul>
       )}
     </div>

     {/* Client Information */}
     <div className="flex flex-col sm:flex-row">
       <div className="form-control sm:w-1/2 sm:mr-4">
         <label htmlFor="nameInput" className="label">
           <span className="label-text">Nombre:</span>
         </label>
         <input
           type="text"
           id="nameInput"
           value={clientFormData.Name}
           disabled
           className="input input-bordered w-full"
           placeholder="Nombre del cliente"
         />
         {selectedClient && (
           <button
             type="button"
             className="btn mt-2 w-full md:w-auto"
             onClick={handleClearSelection}
           >
             Limpiar selección
           </button>
         )}
       </div>
       <div className="form-control sm:w-1/2">
         <label htmlFor="addressInput" className="label">
           <span className="label-text">Dirección:</span>
         </label>
         <input
           type="text"
           id="addressInput"
           value={clientFormData.Address}
           disabled
           className="input input-bordered w-full"
           placeholder="Dirección del cliente"
         />
       </div>
     </div>

     {/* Search Product */}
     <div className="form-control">
       <label htmlFor="productSearch" className="label">
         <span className="label-text">Buscar producto:</span>
       </label>
       <input
         type="text"
         id="productSearch"
         placeholder="Ingrese el nombre del producto..."
         value={productSearch}
         onChange={handleProductSearchChange}
         className="input input-bordered w-full"
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

     {/* Selected Products */}
     <div className="form-control">
       <label htmlFor="selectedProducts" className="label">
         <span className="label-text">Productos seleccionados:</span>
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
               className="btn btn-ghost text-red-500 hover:text-red-700"
               onClick={() => handleRemoveProduct(product)}
             >
               &#10006;
             </button>
           </li>
         ))}
       </ul>
     </div>

     {/* Buttons */}
     <div className="flex justify-end mt-4">
       <button
         type="submit"
         className="btn btn-primary"
         disabled={!selectedClient}
       >
         Aceptar
       </button>
       <button
         type="button"
         className="btn btn-error ml-4"
         onClick={handleCancel}
       >
         Cancelar
       </button>
     </div>
   </form>
 );
};

export default InvoiceCreateForm;