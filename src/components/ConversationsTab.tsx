import { ConversationsTabProps } from "../interfaces/interfaces";

export const ConversationsTab = ({
  conversationsContext,
}: ConversationsTabProps) => {
  const hasConversations = conversationsContext?.conversations.length !== 0;
  return hasConversations ? (
    <ul>
      {conversationsContext?.conversations.map((conversation, index) => (
        <li
          key={index}
          className={`conversation-link ${conversation.selected && "selected"}`}
          onClick={() => conversationsContext?.selectConversationIndex(index)}
        >
          {conversation.recipients
            .map((recipient) => {
              return recipient.name;
            })
            .join(", ")}
          <span className="last-message">
            {conversation.messages.length > 0 &&
              (conversation.messages[conversation.messages.length - 1].message
                .length > 20
                ? `${conversation.messages[
                    conversation.messages.length - 1
                  ].message.slice(0, 20)}...`
                : conversation.messages[conversation.messages.length - 1]
                    .message)}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <div className="sidebar-tab-wrapper">
      <div className="sidebar-wrapper-no-info">You have no conversations.</div>
    </div>
  );
};
