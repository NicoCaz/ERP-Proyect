import React, { useState } from "react";
import { useStore } from "../../../contexts/StoreContext";
import { Product } from "../../../../types/product";

interface ProductsTableProps {
  onClickEditModal: (product: Product) => void;
  onClickDeleteModal: (product: Product) => void;
  onClickCreateModal: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  onClickEditModal,
  onClickCreateModal,
  onClickDeleteModal,
}) => {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de productos por página

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const tableCellClasses = "px-6 py-4 whitespace-nowrap text-sm font-medium";
  const buttonClasses = (color: string) => `btn btn-${color} mx-1`;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <input
          className="input input-bordered w-full sm:w-7/10 m-4 p-2 rounded-lg shadow-md"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={onClickCreateModal}
          className="btn btn-primary btn-active btn-sm shadow-md hover:shadow-lg transition-shadow duration-200 m-4"
        >
          Agregar Producto
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs table-zebra w-full text-left">
          <thead>
            <tr>
              <th className="w-2/5">Nombre</th>
              <th className="w-2/5 ">Precio</th>
              <th className="w-1/5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr
                key={product.Id}
                className={index % 2 === 0 ? "bg-base-400" : "bg-base-100"}
              >
                <td className={tableCellClasses}>{product.Name}</td>
                <td className={tableCellClasses}>{product.Price}</td>
                <td className={`${tableCellClasses} flex justify-around`}>
                  <button
                    onClick={() => onClickEditModal(product)}
                    className={`${buttonClasses("success")} px-2`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onClickDeleteModal(product)}
                    className={`${buttonClasses("error")} px-2`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      <div className="join flex justify-center py-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="join-item btn"
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={
              currentPage === i + 1
                ? "join-item btn btn-active"
                : "join-item btn"
            }
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="join-item btn"
        >
          »
        </button>
      </div>
      {/* Fin de paginación */}
    </div>
  );
};

export default ProductsTable;
