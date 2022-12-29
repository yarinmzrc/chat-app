import { ReactNode } from "react";
import { Socket } from "socket.io";

export interface ContactModalProps {
  onClose: () => void;
}

export interface ConversationModalProps {
  onClose: () => void;
}

export interface DashboardProps {
  id: string;
}

export interface LoginProps {
  onIdSubmit: React.Dispatch<React.SetStateAction<string>>;
}

export interface SidebarProps {
  id: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ContactsType {
  id: string;
  name: string;
}

export interface ContactsProviderProps {
  children?: ReactNode;
}

export interface ContactsContextType {
  contacts: ContactsType[];
  createContact: (id: string, name: string) => void;
}

export interface ConversationsProviderProps {
  children?: ReactNode;
  id: string;
}

export interface ConversationsType {
  messages: MessagesType[];
  recipients: string[] | RecipientsType[];
}

export interface ExpandedConversationsType {
  messages: MessagesType[];
  conversations: ConversationsType[];
  recipients: RecipientsType[];
  selected: boolean;
}

export interface RecipientsType {
  id: string;
  name: string;
}

export interface ConversationContextType {
  conversations: ExpandedConversationsType[];
  createConversation: (recipients: string[]) => void;
  selectConversationIndex: (index: number) => void;
  selectedConversation: ConversationsType;
  sendMessage: (recipients: string[], message: string) => void;
  openContactConversation: (contactId: string) => void;
}

export interface SocketContextType {
  socket: Socket;
}

export interface ConversationsTabProps {
  conversationsContext: ConversationContextType | null;
}

export interface ContactsTabProps {
  contactContext: ContactsContextType | null;
  handleChangeTabs: (tab: string) => void;
}

export interface MessagesType {
  message: string;
  id: string;
  senderName: string;
  fromMe: boolean;
}
