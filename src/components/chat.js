import React, { useEffect, useState } from "react";
import "./chat.css";
import axios from "axios";
// import detectURL from "../util/index";

/* detect url in a message and add a link tag */
function detectURL(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
  });
}

/* Title component */
const Title = ({ owner }) => {
  return <div className={"chatApp__convTitle"}>{owner}'s display</div>;
};

/* InputMessage component - used to type the message */
const InputMessage = ({
  isLoading,
  owner,
  sendMessageLoading,
  typing,
  resetTyping,
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async (event) => {
    event.preventDefault();
    /* Disable sendMessage if the message is empty */
    if (message.length > 0) {
      sendMessageLoading(owner, message);
      console.log("owner11", owner, message);
      setMessage("");
      const createChatApiURL = `http://localhost:2000/api/createchat`;

      const body = {
        sender: owner,
        message: message,
      };

      const { data } = await axios.post(createChatApiURL, body);

      console.log("data12", data);
      /* Reset input after send*/
    }
  };

  const handleTyping = (event) => {
    /* Tell users when another user has at least started to write */
    if (message.length > 0) {
      typing(owner);
    } else {
      /* When there is no more character, the user no longer writes */
      resetTyping(owner);
    }
  };

  /* If the chatbox state is loading, loading class for display */
  const loadingClass = isLoading ? "chatApp__convButton--loading" : "";
  // let sendButtonIcon = <i className={"material-icons"}>send</i>;

  return (
    <form onSubmit={handleSendMessage}>
      <input type="hidden" value={owner} />
      {/* <input type="hidden" value={ownerAvatar} /> */}
      <input
        type="text"
        value={message}
        className={"chatApp__convInput"}
        placeholder="Text message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        onKeyUp={handleTyping}
        tabIndex="0"
      />
      <div
        className={"chatApp__convButton " + loadingClass}
        onClick={handleSendMessage}
      >
        Go
      </div>
    </form>
  );
};

/* TypingIndicator component */
const TypingIndicator = ({ owner, isTyping }) => {
  let typersDisplay = "";
  let countTypers = 0;
  /* for each user writing messages in chatroom */
  for (var key in isTyping) {
    /* retrieve the name if it isn't the owner of the chatbox */
    if (key !== owner && isTyping[key]) {
      typersDisplay += ", " + key;
      countTypers++;
    }
  }
  /* formatting text */
  typersDisplay = typersDisplay.substr(1);
  typersDisplay += countTypers > 1 ? " are " : " is ";
  /* if at least one other person writes */
  if (countTypers > 0) {
    return (
      <div className={"chatApp__convTyping"}>
        {typersDisplay} writing
        <span className={"chatApp__convTypingDot"}></span>
      </div>
    );
  }
  return <div className={"chatApp__convTyping"}></div>;
};

/* MessageList component - contains all messages */
const MessageList = ({ owner, messages }) => {
  return (
    <div className={"chatApp__convTimeline"}>
      {messages
        .slice(0)
        .reverse()
        .map((messageItem) => (
          <MessageItem
            key={messageItem.id}
            owner={owner}
            sender={messageItem.sender}
            message={messageItem.message}
          />
        ))}
    </div>
  );
};

/* MessageItem component - composed of a message and the sender's avatar */
const MessageItem = ({ owner, sender, message }) => {
  /* message position formatting - right if I'm the author */
  console.log("sender12", owner, sender);

  let messagePosition =
    owner === sender
      ? "chatApp__convMessageItem--right"
      : "chatApp__convMessageItem--left";
  return (
    <div
      className={"chatApp__convMessageItem " + messagePosition + " clearfix"}
    >
      {/* <img
        src={senderAvatar}
        alt={sender}
        className="chatApp__convMessageAvatar"
      /> */}
      <div
        className="chatApp__convMessageValue"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    </div>
  );
};

/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
const ChatBox = ({
  owner,
  sendMessage,
  typing,
  resetTyping,
  messages,
  isTyping,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  const sendMessageLoading = (sender, message) => {
    setIsLoading(true);
    sendMessage(sender, message);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className={"chatApp__conv"}>
      <Title owner={owner} />
      <MessageList owner={owner} messages={messages} />
      <div className={"chatApp__convSendMessage clearfix"}>
        <TypingIndicator owner={owner} isTyping={isTyping} />
        <InputMessage
          isLoading={isLoading}
          owner={owner}
          sendMessage={sendMessage}
          sendMessageLoading={sendMessageLoading}
          typing={typing}
          resetTyping={resetTyping}
        />
      </div>
    </div>
  );
};

/* ChatRoom component - composed of multiple ChatBoxes */
const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "shun@123.com",
      message: "Hello",
    },
    {
      id: 2,
      sender: "Gabe@123.com",
      message: "Hey!",
    },
    {
      id: 3,
      sender: "Gabe@123.com",
      message: "How are you?",
    },
  ]);

  console.log("messages1212", messages);
  const [isTyping, setIsTyping] = useState({});

  /* adds a new message to the chatroom */
  const sendMessage = async (sender, message) => {
    setTimeout(() => {
      let messageFormat = detectURL(message);
      let newMessageItem = {
        id: messages.length + 1,
        sender,
        message: messageFormat,
      };
      setMessages([...messages, newMessageItem]);
      resetTyping(sender);
    }, 400);
  };

  const getApi = async () => {
    const getChatApiURL = `http://localhost:2000/api/getchat/6611177533a1f9372276de47`;
    const { data } = await axios.get(getChatApiURL);
    console.log("data33", data?.data[0]?.messages);
    setMessages(data?.data[0]?.messages);
  };

  useEffect(() => {
    getApi();
  }, []); //

  /* updates the writing indicator if not already displayed */
  const typing = (writer) => {
    if (!isTyping[writer]) {
      setIsTyping({ ...isTyping, [writer]: true });
    }
  };

  /* hide the writing indicator */
  const resetTyping = (writer) => {
    setIsTyping({ ...isTyping, [writer]: false });
  };

  /* user details - can add as many users as desired */
  const users = {
    0: { name: "shun@123.com" },
    1: { name: "Gabe@123.com" },
  };

  /* creation of a chatbox for each user present in the chatroom */
  const chatBoxes = Object.keys(users).map((key) => {
    const user = users[key];
    return (
      <ChatBox
        key={key}
        owner={user.name}
        sendMessage={sendMessage}
        typing={typing}
        resetTyping={resetTyping}
        messages={messages}
        isTyping={isTyping}
      />
    );
  });

  return <div className={"chatApp__room"}>{chatBoxes}</div>;
};

export default ChatRoom;
