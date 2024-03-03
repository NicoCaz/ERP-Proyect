import React, { useState } from 'react';
import ProductsTable from './components/ProductTable';
import { Product } from '../../../types/product';
import Modal from '../../components/Modal';
import Product_Create_Form from "./components/Product_Create_Form";
import Product_Edit_Form from "./components/Product_Edit_Form";

const ProductsPage: React.FC = () => {
   // ------ State --------
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 
   const [selectedProduct, setSelectedProduct] = useState<Product>();
 
   // ------ Effects --------
 
   // ------ Functions --------
   const openEditModal = (product: Product) => {
     setSelectedProduct(product);
     setIsEditModalOpen(true);
   };
   const openCreateModal = () => {
     setIsCreateModalOpen(true);
   };
   const closeModal = () => {
     setIsEditModalOpen(false);
     setIsCreateModalOpen(false);
   };
 



  return (
    <div>
      <ProductsTable  onClickEditModal={openEditModal} onClickCreateModal={openCreateModal}  />
      {isEditModalOpen && (
        <Modal onClose={closeModal}>
          <Product_Edit_Form
            product={selectedProduct!}
            onClose={closeModal}
          ></Product_Edit_Form>
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal onClose={closeModal}>
          <Product_Create_Form
            onClose={closeModal}
          ></Product_Create_Form>
        </Modal>
      )}
    </div>
  );
};

export default ProductsPage;


