import React, { useState } from "react";
import { Product } from "../../../../../types/product";

interface ProductSearchProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ products, onSelectProduct }) => {
  const [productSearch, setProductSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleProductSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearch(e.target.value);
  };

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
    setProductSearch("");
  };

  return (
    <div className="mb-4">
      <label htmlFor="productSearch" className="block mb-2">
        Buscador productos:
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
            <span>{product.Name}</span>
            <span className="ml-2">{product.Price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;