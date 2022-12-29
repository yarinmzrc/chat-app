import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  ConversationContextType,
  ConversationsProviderProps,
  ConversationsType,
  ExpandedConversationsType,
  RecipientsType,
} from "../interfaces/interfaces";
import { arrayEquality } from "../utils/utils";
import { useContacts } from "./ContactProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext =
  React.createContext<ConversationContextType | null>(null);

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({
  id,
  children,
}: ConversationsProviderProps) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const contactContext = useContacts();
  const socketContext = useSocket();

  const createConversation = (recipients: string[]) => {
    const prevConversations: ConversationsType[] = [...conversations];
    let conversationExists = false;
    prevConversations.forEach((conversation) => {
      if (arrayEquality(conversation.recipients, recipients)) {
        conversationExists = true;
      }
    });
    if (conversationExists) return "Conversation exists already";
    setConversations((prevConversations: ConversationsType[]) => [
      ...prevConversations,
      { recipients, messages: [] },
    ]);
  };

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const formattedConversations: ExpandedConversationsType[] = conversations.map(
    (conversation: ConversationsType, index: number) => {
      const recipients = conversation.recipients.map(
        (recipient: RecipientsType | string) => {
          const contact = contactContext?.contacts.find(
            (contact) =>
              contact.id ===
              (typeof recipient === "string" ? recipient : recipient.id)
          );
          const name =
            (contact && contact.name) ||
            (typeof recipient === "string" ? recipient : recipient.name);
          return {
            id: typeof recipient === "string" ? recipient : recipient.id,
            name,
          };
        }
      );

      const messages = conversation.messages.map((message) => {
        const contact = contactContext?.contacts.find(
          (contact) => contact.id === message.id
        );
        const name = (contact && contact.name) || message.id;
        const fromMe = id === message.id;
        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  interface AddMessageToConversationProps {
    recipients: string[];
    message: string;
    id: string;
  }

  const addMessageToConversation = useCallback(
    ({ recipients, message, id }: AddMessageToConversationProps) => {
      setConversations((prevConversations: ConversationsType[]) => {
        let madeChange = false;
        const newMessage = { id, message };
        let newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          const convesationMadeChange = prevConversations.find((conversation) =>
            arrayEquality(conversation.recipients, recipients)
          );
          if (convesationMadeChange?.messages != undefined) {
            convesationMadeChange?.messages.push({
              ...newMessage,
              fromMe: false,
              senderName: "",
            });
          }
          newConversations = newConversations.filter((conversation) => {
            return !arrayEquality(conversation.recipients, recipients);
          });
          if (convesationMadeChange !== undefined) {
            newConversations.unshift(convesationMadeChange);
          }
          setSelectedConversationIndex(0);
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  const recieveMessage = async () => {
    if (socketContext?.socket == null) return;

    socketContext.socket.on("recieve-message", addMessageToConversation);

    return () =>
      socketContext.socket.removeListener("recieve-message", () => {
        return;
      });
  };

  useEffect(() => {
    recieveMessage();
  }, [socketContext?.socket, addMessageToConversation]);

  const sendMessage = (recipients: string[], message: string) => {
    socketContext?.socket.emit("send-message", { recipients, message });
    addMessageToConversation({ recipients, message, id });
  };

  const findConversationIndex = (contactId: string) => {
    return conversations.findIndex((conversation: ConversationsType) =>
      arrayEquality(conversation.recipients, [contactId])
    );
  };

  const openContactConversation = (contactId: string) => {
    let findContactIndexInConversations = findConversationIndex(contactId);
    if (findContactIndexInConversations === -1) {
      createConversation([contactId]);
      findContactIndexInConversations = findConversationIndex(contactId);
    }
    setSelectedConversationIndex(findContactIndexInConversations);
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        selectConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage: sendMessage,
        openContactConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
