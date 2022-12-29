import { DashboardProps } from "../interfaces/interfaces";
import { useConversations } from "../providers/ConversationsProvider";
import { OpenConversation } from "./OpenConversation/OpenConversation";
import { Sidebar } from "./Sidebar/Sidebar";

export const Dashboard = ({ id }: DashboardProps) => {
  const conversationContext = useConversations();

  return (
    <div className="dashboard">
      <Sidebar id={id} />
      {conversationContext?.selectedConversation && <OpenConversation />}
    </div>
  );
};
