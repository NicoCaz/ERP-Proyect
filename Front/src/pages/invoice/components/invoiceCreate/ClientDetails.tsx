import React from "react";
import { Customer } from "../../../../../types/customer";

interface ClientDetailsProps {
  selectedClient: Customer | null;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ selectedClient }) => {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="nameInput" className="block mb-2">
          Nombre
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="nameInput"
            value={selectedClient?.Name || ""}
            disabled
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            placeholder="Nombre del cliente"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="addressInput" className="block mb-2">
          Dirección
        </label>
        <input
          type="text"
          id="addressInput"
          value={selectedClient?.Address || ""}
          disabled
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
          placeholder="Dirección del cliente"
        />
      </div>
    </div>
  );
};

export default ClientDetails;