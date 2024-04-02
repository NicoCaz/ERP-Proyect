import React from "react";
import { Product } from "../../../../../types/product";

interface ProductListProps {
  selectedProducts: Product[];
  onRemoveProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ selectedProducts, onRemoveProduct }) => {
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.Price, 0);
  };

  return (
    <div className="mb-4">
      <label htmlFor="selectedProducts" className="block mb-2">
        Nombre Precio Cantidad
      </label>
      <ul className="border border-gray-300 rounded-md">
        {selectedProducts.map((product) => (
          <li
            key={product.Id}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-200"
          >
            <span>{product.Name}</span>
            <span>{product.Price}</span>
            <span>1</span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => onRemoveProduct(product)}
            >
              &#10006;
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <span>Total:</span>
        <span className="ml-2">{calculateTotal()}</span>
      </div>
    </div>
  );
};

export default ProductList;