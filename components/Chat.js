import React, { useEffect, useState } from "react";
import styles from "../styles/Chat.module.scss";
import Svg from "../components/Svg";
import { useStateProvider } from "../ContextApi/StateProvider";
import {
  ChevronDoubleRightIcon,
  EmojiHappyIcon,
  LinkIcon,
  MicrophoneIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { pusher } from "../lib/pusher-js";

const Chat = () => {
  const [{ showMessages, info, user }, dispatch] = useStateProvider();
  const [input, setInput] = useState("");

  useEffect(() => {
    const channel = pusher.subscribe("chat");

    channel.bind("getMessage", (data) => {
      dispatch({
        type: "INFO",
        item: [
          {
            name: data[0]?.name || info[0]?.name,
            data,
          },
        ],
      });
    });

    channel.bind("remove", () => {
      dispatch({
        type: "INFO",
        item: [],
      });
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/chat/update", {
        name: info[0]?.name,
        message: input,
        username: user?.username,
      })
      .then(() => {
        axios.post("/api/chat/pusherGetName", { name: info[0]?.name });
      });

    setInput("");
  };

  return (
    <div className={!showMessages ? styles.chat : styles.chat__show}>
      <ChevronDoubleRightIcon
        className={styles.rightArrow}
        onClick={() => {
          dispatch({
            type: "SHOW",
            item: !showMessages,
          });
        }}
      />
      <div className={styles.chat__container}>
        {info.length === 0 ? (
          // EMPTY PAGE
          <div className={styles.messages__empty}>
            <div className={styles.empty__container}>
              <Svg />
              <div className={styles.empty__info}>
                <h2>WhatsApp Web Clone</h2>
                <p>Now send and receive messages</p>
              </div>
            </div>
          </div>
        ) : (
          // NOT EMPTY PAGE
          <div className={styles.messages__info}>
            {/* header */}
            <div className={styles.info__header}>
              <p>{info[0]?.name}</p>
            </div>
            {/* messages */}
            <div className={styles.info__messages}>
              {info[0].data.map((msg) => (
                <div
                  className={
                    user.username === msg.messages.username
                      ? styles.messages__container
                      : styles.messages__receiver
                  }
                  key={msg.messages._id}
                >
                  <div className={styles.container}>
                    <p className={styles.username}>
                      {user.username === msg.messages.username
                        ? "ME"
                        : msg.messages.username}
                    </p>
                    {msg.messages.message}
                  </div>
                </div>
              ))}
            </div>
            {/* input */}
            <div className={styles.info__input}>
              <EmojiHappyIcon />
              <LinkIcon />
              <form
                onSubmit={submitHandler}
                className={styles.input__container}
              >
                <input
                  type="text"
                  placeholder="Send a message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className={styles.button} type="submit">
                  Enter
                </button>
              </form>
              <MicrophoneIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
