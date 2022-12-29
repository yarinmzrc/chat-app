import { ContactsTabProps } from "../interfaces/interfaces";
import { useConversations } from "../providers/ConversationsProvider";

export const ContactsTab = ({
  contactContext,
  handleChangeTabs,
}: ContactsTabProps) => {
  const hasAnyContacts = contactContext?.contacts.length !== 0;
  const conversationsContext = useConversations();

  return (
    <div>
      {hasAnyContacts ? (
        contactContext?.contacts.map((contact, index) => (
          <div
            onClick={() => {
              conversationsContext?.openContactConversation(contact.id);
              handleChangeTabs("Conversations");
            }}
            className="sidebar-tab-link"
            key={contact.id}
          >{`${index + 1}. ${contact.name}`}</div>
        ))
      ) : (
        <div className="sidebar-tab-wrapper">
          <div className="sidebar-wrapper-no-info">You have no contacts.</div>
        </div>
      )}
    </div>
  );
};
