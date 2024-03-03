import CustomersTable from "./components/CustomersTable";
import Modal from "../../components/Modal";
import { useState } from "react";
import { Customer } from "../../../types/customer";
import Customer_Create_Form from "./components/Customer_Create_Form";
import Customer_Edit_Form from "./components/Customer_Edit_Form";

const CustomerPage: React.FC = () => {
  // ------ State --------
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      <CustomersTable onClickEditModal={openEditModal} onClickCreateModal={openCreateModal} />
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
      )}
    </div>
  );
};

export default CustomerPage;
