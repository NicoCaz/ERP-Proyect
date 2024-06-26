import React, { useEffect, useState } from "react";
import { Customer } from "../../../../types/customer";
import { useStore } from "../../../contexts/StoreContext";

interface Customer_Edit_Form_Props {
  customer: Customer;
  onClose: Function;
}

const Customer_Edit_Form: React.FC<Customer_Edit_Form_Props> = ({
  customer,
  onClose,
}) => {
  const [formData, setFormData] = useState<Customer>(customer);
  const { editCustomer} = useStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(customer);
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (formData.Name.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, Name: "Nombre es requerido" }));
      return;
    }if (formData.Address.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, Name: "Dirreccion es requerido" }));
      return;
    }

    try {
 
      editCustomer(formData)
      onClose();
    } catch (error) {     
       console.error(error);
    }
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form className="max-w-3xl grid gap-4 py-10 px-8 sm:grid-cols-2 bg-white rounded-md shadow-lg">
      <div className="flex flex-col">
        <label htmlFor="Name" className="text-sm font-semibold text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          name="Name"
          id="Name"
          value={formData.Name}
          onChange={handleChange}
          className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${
            errors.Name ? "ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.Name && <span className="text-red-500 text-sm">{errors.Name}</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="Price" className="text-sm font-semibold text-gray-700 mb-1">
          Precio
        </label>
        <input
          type="number"
          name="Price"
          id="Price"
          value={formData.Address}
          onChange={handleChange}
          className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${
            errors.Price ? "ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.Price && <span className="text-red-500 text-sm">{errors.Price}</span>}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-6 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleSubmit}
        >
          Aceptar
        </button>
        <button
          type="button"
          className="mt-6 ml-4 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default Customer_Edit_Form;
