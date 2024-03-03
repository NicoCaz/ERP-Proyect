import React, { useState } from "react";
import ClienteSelector from "./ClienteSelector";
import ProductoSelector from "./ProductoSelector";
import ListaProductos from "./ListaProductos";
import { Customer } from "../../../../types/customer";
import { Product } from "../../../../types/product";

const CrearFactura: React.FC = () => {
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<Customer | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Product | null>(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    Product[]
  >([]);

  const handleSelectCliente = (cliente: Customer) => {
    setClienteSeleccionado(cliente);
  };

  const handleSelectProducto = (producto: Product) => {
    setProductoSeleccionado(producto);
  };

  const handleAgregarProducto = () => {
    // Lógica para agregar un producto a la lista de productos seleccionados
    // ...
  };

  const handleConfirmar = () => {
    // Lógica para confirmar la factura
    // ...
  };

  const handleCancelar = () => {
    // Lógica para cancelar la factura
    // ...
  };

  return (
    <div>
      <h2>Número de Factura: {/* Número de factura aquí */}</h2>
      <ClienteSelector onSelectCliente={handleSelectCliente} />
      <ProductoSelector onSelectProducto={handleSelectProducto} />
      <button onClick={handleAgregarProducto}>Agregar Producto</button>
      <ListaProductos productosSeleccionados={productosSeleccionados} />
      <button onClick={handleConfirmar}>Confirmar</button>
      <button onClick={handleCancelar}>Cancelar</button>
    </div>
  );
};

export default CrearFactura;
