import React, { useEffect, useState } from "react";
import { Customer } from "../../../../types/customer";
import { useStore } from "../../../contexts/StoreContext";
import { Invoice } from "../../../../types/invoice";

interface Invoice_Edit_Form_Props {
  invoice: Invoice;
  onClose: Function;
}

const Invoice_Edit_Form: React.FC<Invoice_Edit_Form_Props> = ({
  invoice,
  onClose,
}) => {
  const [formData, setFormData] = useState<Invoice>(invoice);
  const { editInvoice} = useStore();

  useEffect(() => {
    setFormData(invoice);
  }, [invoice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    try {
      e.preventDefault();
      editInvoice(formData)
      onClose();
    } catch (error) {}
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
            value={formData.ClientId!}
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
            type="Date"
            name="Date"
            id="Date"
            value={formData.Date.toString()}
            onChange={handleChange}
            className="peer block w-full border-0 p-0 number-base text-gray-900 placeholder-gray-400 focus:ring-0 pl"
          />
          <label
            htmlFor="Date"
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

export default Invoice_Edit_Form;
