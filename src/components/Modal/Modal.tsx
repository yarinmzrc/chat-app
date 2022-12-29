import { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const modalWrapperClassName = (e.target as Element).className;
    if (modalWrapperClassName === "modal-wrapper") {
      onClose();
    }
  };

  return (
    <div onClick={(e) => handleCloseModal(e)} className="modal-wrapper">
      <div className="modal">{children}</div>
    </div>
  );
};
