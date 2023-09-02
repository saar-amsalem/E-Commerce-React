import "./Css/ChatApp.css";
import { useState } from "react";
import Chat from "./Chat";
import io from "socket.io-client";

const socket = io("http://localhost:3031");

function ChatApp() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username) {
      socket.emit("join_room", username);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter your username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={username} />
      )}
    </div>
  );
}

export default ChatApp;
