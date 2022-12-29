import {
  ConversationsTabProps,
  ExpandedConversationsType,
} from "../interfaces/interfaces";

export const ConversationsTab = ({
  conversationsContext,
}: ConversationsTabProps) => {
  const hasNoConversations = conversationsContext?.conversations.length === 0;

  const lastMessageToDisplay = (conversation: ExpandedConversationsType) => {
    return (
      conversation.messages.length > 0 &&
      (conversation.messages[conversation.messages.length - 1].message.length >
      20
        ? `${conversation.messages[
            conversation.messages.length - 1
          ].message.slice(0, 20)}...`
        : conversation.messages[conversation.messages.length - 1].message)
    );
  };

  const noConversationsMessage = (
    <div className="sidebar-tab-wrapper">
      <div className="sidebar-wrapper-no-info">You have no conversations.</div>
    </div>
  );

  const recipientsConversationToDisplay = (
    conversation: ExpandedConversationsType
  ) => {
    return conversation.recipients
      .map((recipient) => {
        return recipient.name;
      })
      .join(", ");
  };

  const handleSelectConversation = (index: number) => {
    conversationsContext?.selectConversationIndex(index);
  };

  return hasNoConversations ? (
    noConversationsMessage
  ) : (
    <ul>
      {conversationsContext?.conversations.map((conversation, index) => (
        <li
          key={index}
          className={`sidebar-tab-link ${conversation.selected && "selected"}`}
          onClick={() => handleSelectConversation(index)}
        >
          {recipientsConversationToDisplay(conversation)}
          <span className="last-message">
            {lastMessageToDisplay(conversation)}
          </span>
        </li>
      ))}
    </ul>
  );
};
