import React from 'react';
import { Customer } from '../../../../types/customer';

interface ClienteSelectorProps {
  onSelectCliente: (cliente: Customer) => void;
}

const ClienteSelector: React.FC<ClienteSelectorProps> = ({ onSelectCliente }) => {
  // Lógica para seleccionar un cliente
  // ...

  return (
    <div>
      <label htmlFor="cliente-search">Buscar Cliente:</label>
      <input type="text" id="cliente-search" />
      {/* Lista de clientes sugeridos */}
      <ul>
        {/* Renderizar la lista de clientes aquí */}
      </ul>
      {/* Lógica para seleccionar un cliente */}
      {/* ... */}
    </div>
  );
};

export default ClienteSelector;
