import {
  Card,
  Button,
  Row,
  Col,
  Pagination,
  Dropdown,
  Stack,
} from "react-bootstrap";
import MessageThumbnail from "./MessageThumbnail";
import MessageBubble from "./MessageBubble";
import catImg from "../assets/cat1.jpeg";

import { PanelContext } from "../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

function MessagePage() {
  let animal = ["Catto1", "Catto2", "Catto3", "Catto4", "Catto5", "Catto6"];

  const [chats, setChats] = useState([]);
  const { isAuthenticated, login, logout, userDetails } = useAuth();
  const [selectedChat, setSelectedChat] = useState(-1);

  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  const [message, setMessage] = useState("");

  const sendHandle = () => {
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    axios.post("http://127.0.0.1:8000/message/send", {
      user_id: userDetails.user_id,
      date_and_time: formattedDate,
      receiver_id: chats[selectedChat].chat_id,
      content: message,
    });
    setMessage("");
    setChats((prevState) => {
      return prevState.map((state) =>
        state.chat_id === chats[selectedChat].chat_id
          ? {
              ...state,
              messages: [
                ...state.messages,
                {
                  content: message,
                  sender_id: userDetails.user_id,
                  receiver_id: state.chat_id,
                  date: formattedDate,
                },
              ],
            }
          : state
      );
    });
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/message/get/?user_id=${userDetails.user_id}`)
      .then((res) => {
        setChats(res.data.chats);
      });
  }, []);

  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button
        className="position-relative top-2 start-2"
        onClick={() => setCurrentPanel("back")}
      >
        Back
      </Button>

      <div className="d-flex gap-3">
        <div className="" style={{ flex: "1 1 0", border: "1px solid" }}>
          <div
            className="d-flex flex-column p-3"
            style={{ maxHeight: "70vh", overflowY: "scroll" }}
          >
            {chats.map((c, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedChat(i);
                }}
              >
                {" "}
                <MessageThumbnail
                  username={c.username}
                  date={chats[i].messages[0].date}
                  role={c.role.toUpperCase().replace("_", " ")}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="d-flex flex-column justify-content-center gap-3 p-3"
          style={{ flex: "2 2 0", height: "90vh" }}
        >
          <div
            className="gap-5 p-3"
            style={{ flex: "2 2 0", border: "1px solid", overflowY: "scroll" }}
          >
            {selectedChat !== -1 &&
              chats[selectedChat].messages.map((m, i) => (
                <MessageBubble
                  username={chats[selectedChat].username}
                  side={m.sender_id === userDetails.user_id ? 1 : 0}
                  date={m.date}
                  content={m.content}
                />
              ))}
          </div>
          <div style={{ flex: "1 1 0", border: "1px solid" }}>
            <div className="form-floating h-100 mb-3">
              <textarea
                className="form-control"
                placeholder="Type your message here"
                value={message}
                id="floatingTextarea2"
                style={{ height: "100%" }}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <Button onClick={() => sendHandle()} className="w-100">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
