import React from 'react';
import { Product } from '../../../../types/product';



interface ListaProductosProps {
  productosSeleccionados: Product[];
}

const ListaProductos: React.FC<ListaProductosProps> = ({ productosSeleccionados }) => {
  // Lógica para renderizar la lista de productos y calcular el total
  // ...

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Costo</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Renderizar la lista de productos seleccionados aquí */}
        </tbody>
      </table>
      <div>Total: {/* Calcular y mostrar el total de la factura */}</div>
    </div>
  );
};

export default ListaProductos;
