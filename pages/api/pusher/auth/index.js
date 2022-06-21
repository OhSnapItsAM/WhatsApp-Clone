import { pusher } from "../../../../lib/pusher";

export default async function handler(req, res) {
  const { socket_id, channel_name } = req.body;

  try {
    pusher.authenticate(socket_id, channel_name);
  } catch (err) {
    console.error(err);
  }
}
