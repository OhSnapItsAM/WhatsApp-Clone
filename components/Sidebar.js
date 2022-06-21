import React, { useEffect, useState } from "react";
import styles from "../styles/Sidebar.module.scss";
import {
  StatusOnlineIcon,
  ChatAltIcon,
  DotsVerticalIcon,
  SearchIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/outline";
import ChatRow from "./ChatRow";
import { useStateProvider } from "../ContextApi/StateProvider";
import axios from "axios";
import { pusher } from "../lib/pusher-js";

const Sidebar = () => {
  const [{ showMessages, user, chat }, dispatch] = useStateProvider();
  const [input, setInput] = useState("");

  useEffect(() => {
    const channel = pusher.subscribe("chat");

    channel.bind("getChatRow", (data) => {
      dispatch({
        type: "CHAT",
        item: data,
      });
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (input.trim().length === 0) {
      // No empty chat names
      alert("Have to enter a chat name!");
    } else {
      // Create Chat
      axios
        .post("/api/chat/create", {
          name: input,
        })
        .then(() => {
          axios.get("/api/chat/get");
        });
    }

    setInput("");
  };

  return (
    <div className={!showMessages ? styles.sidebar : styles.sidebar__hide}>
      {/* header */}
      <div className={styles.sidebar__header}>
        {/* profile pic */}
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Profile Pic"
        />
        <h5>{user?.username}</h5>
        {/* buttons */}
        <div className={styles.header__buttons}>
          <StatusOnlineIcon />
          <ChatAltIcon />
          <DotsVerticalIcon />
          <ChevronDoubleLeftIcon
            className={styles.buttons__leftArrow}
            onClick={() => {
              dispatch({
                type: "SHOW",
                item: !showMessages,
              });
            }}
          />
        </div>
      </div>
      {/* search */}
      <div className={styles.sidebar__search}>
        <form onSubmit={submitHandler} className={styles.search__container}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Start a new chat"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
      {/* chat(s) */}
      <div className={styles.sidebar__chat}>
        {chat.length === 0 ? (
          // Empty Chat
          <div className={styles.chat__empty}>No Chat</div>
        ) : (
          // Chat
          <div className={styles.chat__chat}>
            {chat.map((data) => (
              <ChatRow key={data?._id} name={data?.name} date={data?.date} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
