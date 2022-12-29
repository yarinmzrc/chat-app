import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  ContactsContextType,
  ContactsProviderProps,
  ContactsType,
} from "../interfaces/interfaces";

const ContactsContext = React.createContext<ContactsContextType | null>(null);

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id?: string, name?: string) => {
    if (!id || !name) return;
    if (contacts.length > 0) {
      const idInContacts = contacts.findIndex(
        (contact: { id: string }) => contact.id === id
      );
      if (idInContacts > -1) return;
    }
    setContacts((prevContacts: ContactsType[]) => [
      ...prevContacts,
      { id, name },
    ]);
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
