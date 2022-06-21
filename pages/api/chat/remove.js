import { db } from "../../../lib/mongodb";
import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  const { name } = req.body;

  const collection = db.collection("chat");

  const resp = await collection.deleteOne({ name });

  await pusher.trigger("chat", "remove", resp);

  res.send(resp);
}
