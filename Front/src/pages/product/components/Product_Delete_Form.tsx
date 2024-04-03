import React, { useState, useEffect } from "react";
import { useStore } from "../../../contexts/StoreContext";
import { Product } from "../../../../types/product";

interface Product_Delete_Form_Props {
  product: Product;
  onClose: Function;
}

const Product_Delete_Form: React.FC<Product_Delete_Form_Props> = ({
  product,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    Id: product.Id,
    Name: product.Name,
    Price: product.Price,
  });

  const { deletedProduct } = useStore();
  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleDeleteConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    deletedProduct(product);
    onClose();
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form className="max-w-3xl grid gap-4 py-10 px-8 bg-white rounded-md shadow-lg">
      <div className="flex flex-col space-y-2">
        <p className="text-sm font-semibold text-gray-700 mb-1 text-center">
          ¿Estás seguro de que quieres eliminar el producto "{formData.Name}"
          con precio de {formData.Price}?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <button
          type="submit"
          className="btn btn-primary w-full mt-6 transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleDeleteConfirmation}
        >
          Eliminar
        </button>
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

export default Product_Delete_Form;