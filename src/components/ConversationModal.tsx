import { useState } from "react";
import { ConversationModalProps } from "../interfaces/interfaces";
import { useContacts } from "../providers/ContactProvider";
import { useConversations } from "../providers/ConversationsProvider";

export const ConversationModal = ({ onClose }: ConversationModalProps) => {
  const contactsContext = useContacts();
  const conversationContext = useConversations();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleChangeCheckboxClick = (id: string) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        setError("");
        return prevSelectedContacts.filter((contact) => contact !== id);
      } else {
        setError("");
        return [...prevSelectedContacts, id];
      }
    });
  };

  const handleSubmitConversation = () => {
    if (selectedContacts.length === 0) return;
    const response = conversationContext?.createConversation(selectedContacts);
    if (response) {
      setError(response);
    } else {
      setError("");
      onClose();
    }
  };

  return contactsContext?.contacts.length === 0 ? (
    <div className="modal-wrapper-no-contacts">
      <h3 className="modal-title">No Contacts</h3>
    </div>
  ) : (
    <div>
      <h3 className="modal-title">Create Conversation</h3>
      <form>
        <ul className="contacts-wrapper">
          {contactsContext?.contacts.map((contact) => (
            <li
              onClick={() => handleChangeCheckboxClick(contact.id)}
              className={`contacts-link ${
                selectedContacts.includes(contact.id) ? "selected" : ""
              }`}
              key={contact.id}
            >
              {contact.name}
            </li>
          ))}
        </ul>
      </form>
      <div className="error-message">{error ? error : ""}</div>
      <button
        disabled={selectedContacts.length === 0}
        onClick={handleSubmitConversation}
      >
        Create
      </button>
    </div>
  );
};
