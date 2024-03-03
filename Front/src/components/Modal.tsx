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
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center"
      onClick={handleClose}>
            <div className="bg-gray-50 rounded-lg" onClick={(e) => e.stopPropagation()}>
{children}</div>
    </div>
  );
};

export default Modal;
