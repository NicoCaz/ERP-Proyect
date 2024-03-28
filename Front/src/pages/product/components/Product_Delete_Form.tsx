import React, { useState, useEffect } from "react";
import { useStore } from "../../../contexts/StoreContext";
import { Product } from "../../../../types/product";

interface Product_Delete_Form_Props {
  product: Product;
  onClose: Function;
}

const Product_Delete_Form: React.FC<Product_Delete_Form_Props> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    Id: product.Id,
    Name: product.Name,
    Price: product.Price,
  });

  const { deletedProduct } = useStore();
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleSubmit = () => {
    setConfirmationMessage(`¿Estás seguro de eliminar el producto "${formData.Name}"?`);
  };

  const handleDeleteConfirmation = () => {
    deletedProduct(product);
    onClose();
  };

  const handleCancel = () => {
    setConfirmationMessage("");
  };

  return (
    <form className="max-w-3xl grid gap-4 py-10 px-8 sm:grid-cols-2 bg-white rounded-md shadow-lg">
      {confirmationMessage ? (
        <div className="flex flex-col items-center">
          <p className="text-red-700 mb-4">{confirmationMessage}</p>
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 mr-2"
              onClick={handleDeleteConfirmation}
            >
              Confirmar
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 ml-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-700 mb-1">Nombre: {formData.Name}</p>
          <div className="flex justify-center">
            <button
              type="button"
              className="mt-6 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleSubmit}
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
      )}
    </form>
  );
};

export default Product_Delete_Form;
