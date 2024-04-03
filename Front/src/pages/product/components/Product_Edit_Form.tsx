import React, { useState, useEffect } from "react";
import { useStore } from "../../../contexts/StoreContext";
import { Product } from "../../../../types/product";

interface Product_Edit_Form_Props {
  product: Product;
  onClose: Function;
}

const Product_Edit_Form: React.FC<Product_Edit_Form_Props> = ({
  product,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    Id: product.Id,
    Name: product.Name,
    Price: product.Price,
  });

  const { editProduct } = useStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData({
      Id: product.Id,
      Name: product.Name,
      Price: product.Price,
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.Name.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Name: "Nombre es requerido",
      }));
      return;
    }
    if (formData.Price <= 0 || formData.Price.toString().startsWith("0")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Price: "Precio debe ser mayor que cero y no empezar con cero",
      }));
      return;
    }
    try {
      editProduct(formData);
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
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="Name"
          className="text-sm font-semibold text-gray-700 mb-1 text-center"
        >
          Nombre
        </label>
        <input
          type="text"
          name="Name"
          id="Name"
          value={formData.Name}
          onChange={handleChange}
          className={`input input-bordered ${errors.Name ? "input-error" : ""}`}
        />
        {errors.Name && (
          <span className="text-red-600 text-sm">{errors.Name}</span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="Price"
          className="text-sm font-semibold text-gray-700 mb-1 text-center"
        >
          Precio
        </label>
        <input
          type="text"
          name="Price"
          id="Price"
          value={formData.Price}
          onChange={(e) => {
            // Solo permite números y dos decimales
            if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
              handleChange(e);
            }
          }}
          className={`input input-bordered ${
            errors.Price ? "input-error" : ""
          }`}
        />
        {errors.Price && (
          <span className="text-red-600 text-sm">{errors.Price}</span>
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <button
          type="submit"
          className="btn btn-primary w-full mt-6 transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleSubmit}
        >
          Aceptar
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <button
          type="button"
          className="btn btn-error w-full mt-6 transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default Product_Edit_Form;