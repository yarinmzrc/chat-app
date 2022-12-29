import { ContactsTabProps } from "../interfaces/interfaces";
import { useConversations } from "../providers/ConversationsProvider";

export const ContactsTab = ({
  contactContext,
  handleChangeTabs,
}: ContactsTabProps) => {
  const hasNoContacts = contactContext?.contacts.length === 0;
  const conversationsContext = useConversations();

  const noContactsMessage = (
    <div className="sidebar-tab-wrapper">
      <div className="sidebar-wrapper-no-info">You have no contacts.</div>
    </div>
  );

  const handleSelectContact = (id: string) => {
    conversationsContext?.openContactConversation(id);
    handleChangeTabs("Conversations");
  };

  return (
    <div>
      {hasNoContacts
        ? noContactsMessage
        : contactContext?.contacts.map((contact, index) => (
            <div
              onClick={() => {
                handleSelectContact(contact.id);
              }}
              className="sidebar-tab-link"
              key={contact.id}
            >{`${index + 1}. ${contact.name}`}</div>
          ))}
    </div>
  );
};
