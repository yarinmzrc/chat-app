import { useState } from "react";
import { ContactModal } from "../ContactModal";
import { ConversationModal } from "../ConversationModal";
import { useContacts } from "../../providers/ContactProvider";
import { useConversations } from "../../providers/ConversationsProvider";
import { SidebarProps } from "../../interfaces/interfaces";
import { ConversationsTab } from "../ConversationsTab";
import { ContactsTab } from "../ContactsTab";
import { Modal } from "../Modal/Modal";
import "./Sidebar.css";

const CONVERSATIONS = "Conversations";
const CONTACTS = "Contacts";

export const Sidebar = ({ id }: SidebarProps) => {
  const [tabValue, setTabValue] = useState(CONVERSATIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactContext = useContacts();
  const conversationsContext = useConversations();
  const conversationOpen = tabValue === CONVERSATIONS;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleChangeTabs = (tab: string) => {
    setTabValue(tab);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <nav className="navbar">
          <button
            className={`sidebar-tab-button ${
              tabValue === CONVERSATIONS ? "active" : ""
            }`}
            onClick={() => handleChangeTabs(CONVERSATIONS)}
          >
            Conversations
          </button>
          <button
            className={`sidebar-tab-button ${
              tabValue === CONTACTS ? "active" : ""
            }`}
            onClick={() => handleChangeTabs(CONTACTS)}
          >
            Contacts
          </button>
        </nav>

        <div className="sidebar-tab-wrapper">
          {tabValue === CONVERSATIONS ? (
            <ConversationsTab conversationsContext={conversationsContext} />
          ) : (
            <ContactsTab
              handleChangeTabs={handleChangeTabs}
              contactContext={contactContext}
            />
          )}
        </div>
        <div className="sidebar-id-wrapper">Your Id: {id}</div>
        <button className="sidebar-button" onClick={handleOpenModal}>
          {conversationOpen ? "New Conversation" : "New Contact"}
        </button>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div>
          {conversationOpen ? (
            <ConversationModal onClose={handleCloseModal}></ConversationModal>
          ) : (
            <ContactModal onClose={handleCloseModal}></ContactModal>
          )}
        </div>
      </Modal>
    </div>
  );
};
