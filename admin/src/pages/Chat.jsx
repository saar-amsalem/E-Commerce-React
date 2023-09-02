import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import online from "../icons/onlineIcon.png";
import "./Css/ChatApp.css";


function Chat({ socket }) {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const params = useParams();

  const sendMessage = () => {
    if (currentMessage !== "") {
      // socket.emit("join_room", params.username)
      const messageData = {
        room: params.username,
        author: "saar",
        content: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log(messageData);
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.emit("join_room", params.username)
    socket.on("receive_message", (data) => {
        console.log(data);
      setMessageList((list) => [...list, data]);
    });
    socket.on("history", (data) => {
      setMessageList(data)
    })
    return () => {}
  }, [socket]);

  return (
    
    <div className="chat-window">
      <div className="chat-header">
        <image className="online-icon" src={online} alt="logo" />
        {/* <p>Welcome to Live Chat </p> */}
        <p>welcome to chat with {params.username}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={"saar" === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
