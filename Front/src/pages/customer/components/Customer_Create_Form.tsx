import React, { useState } from "react";
import { useStore } from "../../../contexts/StoreContext";

interface Customer_Create_Form_Props {
  onClose: Function;
}

const Customer_Create_Form: React.FC<Customer_Create_Form_Props> = ({
  onClose,
}) => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    Id: null,
    Name: "",
    Address: "",
  });

  const { addCustomer } = useStore();

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addCustomer(formData);
      onClose();
    } catch (error) {
      console.error(error);
    }
    console.log("Datos del formulario:", formData);
    onClose();
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };
  return (
    <form className="max-w-3xl grid gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md">
      <div className="grid">
        <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
          <input
            type="text"
            name="Name"
            id="Name"
            value={formData.Name}
            onChange={handleChange}
            className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-1"
          />
          <label
            htmlFor="Name"
            className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
          >
            Nombre
          </label>
        </div>
      </div>
      <div className="grid">
        <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
          <input
            type="text"
            name="Address"
            id="Address"
            value={formData.Address}
            onChange={handleChange}
            className="peer block w-full border-0 p-0 number-base text-gray-900 placeholder-gray-400 focus:ring-0 pl"
          />
          <label
            htmlFor="Address"
            className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
          >
            Direccion
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-700 "
          onClick={handleSubmit}
        >
          Aceptar
        </button>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="mt-4 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 "
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default Customer_Create_Form;
