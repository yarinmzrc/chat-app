import { useRef } from "react";
import { ContactModalProps } from "../interfaces/interfaces";
import { useContacts } from "../providers/ContactProvider";

export const ContactModal = ({ onClose }: ContactModalProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactsContext = useContacts();

  const handleCreateContact = () => {
    if (idRef.current && nameRef.current) {
      contactsContext?.createContact(
        idRef.current.value,
        nameRef.current.value
      );
    }
    onClose();
  };

  return (
    <form className="create-contact-wrapper" onSubmit={handleCreateContact}>
      <h3 className="modal-title">Create Contact</h3>
      <input
        autoFocus
        className="contact-input"
        required
        ref={idRef}
        placeholder="Id"
      />
      <input
        className="contact-input"
        required
        ref={nameRef}
        placeholder="Name"
      />
      <button className="create-contact-btn" type="submit">
        Create
      </button>
    </form>
  );
};
