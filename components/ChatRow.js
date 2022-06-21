import React, { useEffect } from "react";
import { useStateProvider } from "../ContextApi/StateProvider";
import styles from "../styles/ChatRow.module.scss";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/outline";

const ChatRow = ({ name, date }) => {
  const [{ info }, dispatch] = useStateProvider();

  const trashHandler = () => {
    axios
      .post("/api/chat/remove", {
        name,
      })
      .then(() => {
        axios.get("/api/chat/get");
      });
  };
  return (
    <div
      className={styles.chatRow}
      onClick={() => {
        axios.post("/api/chat/getName", { name }).then(({ data }) => {
          dispatch({
            type: "INFO",
            item: [
              {
                name: data[0]?.name || name,
                data,
              },
            ],
          });
        });
      }}
    >
      <div className={styles.chatRow__container}>
        <TrashIcon onClick={trashHandler} />
        <h5>{name}</h5>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ChatRow;
