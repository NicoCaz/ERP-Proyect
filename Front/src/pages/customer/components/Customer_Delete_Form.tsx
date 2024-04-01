import React, { useState, useEffect } from "react";
import { useStore } from "../../../contexts/StoreContext";

import { Customer } from "../../../../types/customer";

interface Customer_Delete_Form_Props {
  customer: Customer;
  onClose: Function;
}

const Customer_Delete_Form: React.FC<Customer_Delete_Form_Props> = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({
    Id: customer.Id,
    Name: customer.Name,
    Address: customer.Address,
  });

  const { deleteCustomer } = useStore();
  useEffect(() => {
    setFormData(customer);
  }, [customer]);


  const handleDeleteConfirmation =async (e: React.FormEvent) =>{
    e.preventDefault();
    deleteCustomer(customer);
    onClose();
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };



  return (
    <form className="max-w-3xl grid gap-4 py-10 px-8 sm:grid-cols-2 bg-white rounded-md shadow-lg">
      
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-700 mb-1">Desea eliminar el siguiente Cliente? : {formData.Name}</p>
          <div className="flex justify-center">
            <button
              type="button"
              className="mt-6 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleDeleteConfirmation}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="mt-6 ml-4 bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      
    </form>
  );
};

export default Customer_Delete_Form;
