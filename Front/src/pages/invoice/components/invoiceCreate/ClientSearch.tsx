import React, { useState } from "react";
import { Customer } from "../../../../../types/customer";

interface ClientSearchProps {
  customers: Customer[];
  onSelectClient: (client: Customer) => void;
}

const ClientSearch: React.FC<ClientSearchProps> = ({ customers, onSelectClient }) => {
  const [searchInput, setSearchInput] = useState("");

  const filteredCustomers = customers.filter((client) =>
    client.Name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSelectClient = (client: Customer) => {
    onSelectClient(client);
  };

  return (
    <div className="mb-4">
      <label htmlFor="searchInput" className="block mb-2">
        Buscador clientes:
      </label>
      <input
        type="text"
        id="searchInput"
        placeholder="Ingrese el nombre del cliente..."
        value={searchInput}
        onChange={handleSearchInputChange}
        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md">
        {filteredCustomers.map((client) => (
          <li
            key={client.Id}
            onClick={() => handleSelectClient(client)}
            className={`px-3 py-2 cursor-pointer bg-gray-200`}
          >
            {client.Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSearch;