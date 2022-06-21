/*
  WHAT ARE WE USING IN THIS CLONE
    FRONT-END
      AXIOS
      NEXTJS /W REACT
      PUSHER-JS
      CONTEXT-API
      SCSS
      REACT-HOOKS (USESTATE, USEEFFECT)
    
    BACK-END
      SERVERLESS SERVER
      PUSHER
      MONGODB
*/

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { useStateProvider } from "../ContextApi/StateProvider";
import styles from "../styles/Home.module.scss";
import axios from "axios";

export default function Home() {
  const [{ user }, dispatch] = useStateProvider();
  const [signup, setSignup] = useState(false);
  const [showPasword, setShowPassword] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) {
      alert("Cant have a blank username or password!");
      setUsername("");
      setPassword("");
    } else {
      if (username.length > 20) {
        alert("Username can't be longer than 20 characters!");
        setUsername("");
      } else if (password.length < 8) {
        alert("Password is too short. Must be longer than 8 characters!");
        setPassword("");
      } else {
        axios.get("/api/chat/get").then((data) => {
          console.log(data.data);
          dispatch({
            type: "CHAT",
            item: data.data,
          });
        });
        axios
          .post("/api/user/create", {
            username,
            password,
          })
          .then(({ data }) => {
            if (data.length === 0) {
              alert("User Created");

              setSignup(!signup);
              setPassword("");
              setUsername("");
            } else {
              alert("username is already taken! Try again");

              setUsername("");
            }
          });
      }
    }
  };

  const signinHandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/user/getUser", {
        username,
        password,
      })
      .then(({ data }) => {
        if (data.length === 0) {
          alert("Username or Password is Incorrect! Try again");
        } else {
          dispatch({
            type: "USER",
            item: {
              username,
              password,
            },
          });

          axios.get("/api/chat/get").then((data) => {
            dispatch({
              type: "CHAT",
              item: data.data,
            });
          });

          setUsername("");
          setPassword("");
        }
      });
  };

  return (
    <>
      {user.length === 0 ? (
        // Login/Signup Screen
        <div className={styles.home}>
          {/* Login/Signup Container */}
          <div className={styles.container}>
            {signup ? (
              // Signup
              <div className={styles.container__user}>
                <form
                  onSubmit={signupHandler}
                  className={styles.user__container}
                >
                  <h5>Signup</h5>
                  <div className={styles.user__info}>
                    {/* username */}
                    <div className={styles.user__username__container}>
                      <label htmlFor="username">Username</label>
                      <div className={styles.user__username}>
                        <input
                          type="text"
                          id="username"
                          placeholder="Enter a unique name"
                          autoComplete="off"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* password */}
                    <div className={styles.user__password__container}>
                      <label htmlFor="password">Password</label>
                      <div className={styles.user__password}>
                        <input
                          type={showPasword ? "password" : "text"}
                          id="password"
                          placeholder="Enter a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <p
                        onClick={() => setShowPassword(!showPasword)}
                        className={styles.showPassword}
                      >
                        {showPasword ? "Show Password" : "Hide Password"}
                      </p>
                    </div>
                  </div>
                  <button type="submit" hidden></button>
                  <p
                    onClick={() => setSignup(!signup)}
                    className={styles.changeArea}
                  >
                    Go to sign-in
                  </p>
                </form>
              </div>
            ) : (
              // Signin
              <div className={styles.container__user}>
                <form
                  onSubmit={signinHandler}
                  className={styles.user__container}
                >
                  <h5>Signin</h5>
                  <div className={styles.user__info}>
                    {/* username */}
                    <div className={styles.user__username__container}>
                      <label htmlFor="username">Username</label>
                      <div className={styles.user__username}>
                        <input
                          type="text"
                          id="username"
                          placeholder="Enter your username"
                          autoComplete="off"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* password */}
                    <div className={styles.user__password__container}>
                      <label htmlFor="password">Password</label>
                      <div className={styles.user__password}>
                        <input
                          type={showPasword ? "password" : "text"}
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <p
                        onClick={() => setShowPassword(!showPasword)}
                        className={styles.showPassword}
                      >
                        {showPasword ? "Show Password" : "Hide Password"}
                      </p>
                    </div>
                  </div>
                  <button type="submit" hidden></button>
                  <p
                    onClick={() => setSignup(!signup)}
                    className={styles.changeArea}
                  >
                    Go to sign-up
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        // User Screen
        <div className={styles.home}>
          <Head>
            <title>WhatsApp Clone</title>
            <meta name="description" content="WhatsApp Clone" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {/* Whole Container */}
          <main className={styles.container}>
            {/* Sidebar */}
            <Sidebar />

            {/* Chat */}
            <Chat />
          </main>
        </div>
      )}
    </>
  );
}
