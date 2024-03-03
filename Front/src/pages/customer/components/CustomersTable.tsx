import React from "react";
import { useStore } from "../../../contexts/StoreContext";

interface CustomersTableProps {
  onClickEditModal: Function;
  onClickCreateModal: Function;
}

const CustomersTable: React.FC<CustomersTableProps> = ({
  onClickEditModal,
  onClickCreateModal,
}) => {
  const { customers } = useStore();

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="relative">
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
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 placeholder-gray-400"
              placeholder="Buscar clientes"
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700"
            onClick={() => onClickCreateModal()}
          >
            Agregar Cliente
          </button>
        </div>
        <table className="w-full text-sm text-gray-800 dark:text-white">
          <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
            <tr>
              <th scope="col" className="py-3 pl-4 text-left">
                Clientes
              </th>
              <th scope="col" className="py-3 text-left">
                Dirección
              </th>
              <th scope="col" className="py-3 pr-4 text-right">
                <span className="sr-only">Editar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.Id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-100 dark:bg-gray-700"
                } hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md`}
              >
                <td className="py-4 pl-4 font-medium text-left">
                  {customer.Name}
                </td>
                <td className="py-4 text-left">{customer.Address}</td>
                <td className="py-4 pr-4 text-right">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => onClickEditModal(customer)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
