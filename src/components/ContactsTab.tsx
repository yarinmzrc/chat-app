import { ContactsTabProps } from "../interfaces/interfaces";

export const ContactsTab = ({ contactContext }: ContactsTabProps) => {
  const hasAnyContacts = contactContext?.contacts.length !== 0;
  return (
    <div>
      {hasAnyContacts ? (
        contactContext?.contacts.map((contact, index) => (
          <div className="sidebar-tab-link" key={contact.id}>{`${index + 1}. ${
            contact.name
          }`}</div>
        ))
      ) : (
        <div className="sidebar-tab-wrapper">
          <div className="sidebar-wrapper-no-info">You have no contacts.</div>
        </div>
      )}
    </div>
  );
};
