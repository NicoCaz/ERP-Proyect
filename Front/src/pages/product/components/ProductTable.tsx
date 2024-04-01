import React, { useState }  from "react";
import { useStore } from "../../../contexts/StoreContext";
import { Product } from "../../../../types/product";

interface ProductsTableProps {
  onClickEditModal: (product: Product) => void;
  onClickDeleteModal: (product: Product) => void;
  onClickCreateModal: () => void;
}

const TableRow: React.FC<{ product: Product; onClickEditModal: (product: Product) => void; onClickDeleteModal: (product: Product) => void; index: number }> = ({ product, onClickEditModal, onClickDeleteModal, index }) => (
  <tr
    key={product.Id}
    className={`${
      index % 2 === 0
        ? "bg-white dark:bg-gray-800"
        : "bg-gray-100 dark:bg-gray-700"
    } hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md`}
  >
    <td className="py-2 pl-4 font-medium text-left">{product.Name}</td>
    <td className="py-2 text-left">{product.Price}</td>
    <td className="py-2 pr-4 text-right">
      <button
        className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors mr-2"
        onClick={() => onClickEditModal(product)}
      >
        Editar
      </button>
      <button
        className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-700 transition-colors"
        onClick={() => onClickDeleteModal(product!)}
      >
        Eliminar
      </button>
    </td>
  </tr>
);

const ProductsTable: React.FC<ProductsTableProps> = ({ onClickEditModal, onClickCreateModal, onClickDeleteModal }) => {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de productos por página

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 placeholder-gray-400"
              placeholder="Buscar productos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            onClick={onClickCreateModal}
          >
            Agregar Producto
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-gray-800 dark:text-white">
            <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-2 pl-4 text-left">Nombre</th>
                <th className="py-2 text-left">Precio</th>
                <th className="py-2 pr-4 text-right">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <TableRow
                  key={product.Id}
                  product={product}
                  onClickEditModal={onClickEditModal}
                  onClickDeleteModal={onClickDeleteModal}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <nav aria-label="Paginación">
            <ul className="flex list-style-none">
              <li>
                <button
                  className={`py-2 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className={`py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;