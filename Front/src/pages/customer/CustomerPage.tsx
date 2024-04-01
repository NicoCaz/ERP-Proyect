import CustomersTable from "./components/CustomersTable";
import Modal from "../../components/Modal";
import { useState } from "react";
import { Customer } from "../../../types/customer";
import Customer_Create_Form from "./components/Customer_Create_Form";
import Customer_Edit_Form from "./components/Customer_Edit_Form";
import Customer_Delete_Form from "./components/Customer_Delete_Form";
const CustomerPage: React.FC = () => {
  // ------ State --------
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeletedModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  // ------ Effects --------

  // ------ Functions --------
  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeletedModalOpen(true);
  };
  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
    setIsDeletedModalOpen(false);
  };

  return (
    <div>
      <CustomersTable onClickEditModal={openEditModal} onClickCreateModal={openCreateModal} onClickDeleteModal={openDeleteModal}/>
      {isEditModalOpen && (
        <Modal onClose={closeModal}>
          <Customer_Edit_Form
            customer={selectedCustomer!}
            onClose={closeModal}
          ></Customer_Edit_Form>
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal onClose={closeModal}>
          <Customer_Create_Form
            onClose={closeModal}
          ></Customer_Create_Form>
        </Modal>
      )}{isDeleteModalOpen && (
        <Modal onClose={closeModal}>
          <Customer_Delete_Form
            customer={selectedCustomer!}
            onClose={closeModal}
          ></Customer_Delete_Form>
        </Modal>
      )}
    </div>
  );
};

export default CustomerPage;
