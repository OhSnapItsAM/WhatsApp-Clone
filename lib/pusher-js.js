import Pusher from "pusher-js";

export const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: process.env.PUSHER_APP_CLUSTER,
  authEndpoint: "/api/pusher/auth",
});
