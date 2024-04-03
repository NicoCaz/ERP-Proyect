import InvoicesTable from "./components/InvoicesTable";
import Modal from "../../components/Modal";
import { useState } from "react";
import { Customer } from "../../../types/customer";
import Invoice_Create_Form from "./components/Invoice_Create_Form";
import Invoice_Edit_Form from "./components/Invoice_Edit_Form";
import { Invoice } from "../../../types/invoice";

const InvoicesPage: React.FC = () => {
  // ------ State --------
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeletedModalOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>();

  // ------ Effects --------

  // ------ Functions --------
  const openEditModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsEditModalOpen(true);
  };
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const openDeleteModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDeletedModalOpen(true);
  };


  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
    setIsDeletedModalOpen(false);
  };

  return (
    <div>
      <InvoicesTable onClickEditModal={openEditModal} onClickCreateModal={openCreateModal} />
      {isEditModalOpen && (
        <Modal onClose={closeModal}>
          <Invoice_Edit_Form
            invoice={selectedInvoice!}
            onClose={closeModal}
          ></Invoice_Edit_Form>
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal onClose={closeModal}>
          <Invoice_Create_Form
            onClose={closeModal}
          ></Invoice_Create_Form>
        </Modal>
      )}
    </div>
  );
};

export default InvoicesPage;
