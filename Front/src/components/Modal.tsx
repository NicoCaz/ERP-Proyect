import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: Function;
}

const Modal = ({ children ,onClose}: ModalProps) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur"
      onClick={handleClose}>
            <div className="bg-base-100 rounded-box shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
{children}</div>
    </div>
  );
};

export default Modal;