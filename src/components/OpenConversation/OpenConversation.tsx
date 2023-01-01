import { Box } from "@mui/material";
import { useConversations } from "../../providers/ConversationsProvider";
import { useState, useCallback } from "react";
import "./OpenConversation.css";

export const OpenConversation = () => {
  const [message, setMessage] = useState("");
  const conversationsContext = useConversations();
  const setRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const recipients =
      conversationsContext?.selectedConversation.recipients.map((r) =>
        typeof r === "string" ? r : r.id
      );
    if (recipients !== undefined) {
      conversationsContext?.sendMessage(recipients, message);
    }
    setMessage("");
  };

  return (
    <div className="conversation-wrapper">
      <div className="conversation-messages-wrapper">
        {conversationsContext?.selectedConversation?.messages.map(
          (message, index) => {
            const lastMessage =
              conversationsContext?.selectedConversation?.messages.length -
                1 ===
              index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                className={`conversation-message-wrapper ${
                  !message.fromMe && "from-other"
                }`}
                key={index}
              >
                <div
                  className={`conversation-message ${
                    message.fromMe ? "from-me" : "from-other"
                  }`}
                >
                  {message.message}
                </div>
                <div
                  className={
                    message.fromMe
                      ? "conversation-message-title-from-me"
                      : "conversation-message-title-from-other"
                  }
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          }
        )}
      </div>
      <form className="open-conversation-form" onSubmit={handleSendMessage}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <input
            value={message}
            ref={conversationsContext?.inputConversationRef}
            autoFocus
            className="send-message-input"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send Message"
          />
          <button type="submit" disabled={message ? false : true}>
            Send
          </button>
        </Box>
      </form>
    </div>
  );
};
