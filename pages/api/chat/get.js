import { db } from "../../../lib/mongodb";
import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  const collection = db.collection("chat");

  const resp = await collection
    .aggregate([
      {
        $project: {
          name: "$name",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          messages: "$messages",
        },
      },
    ])
    .toArray();

  await pusher.trigger("chat", "getChatRow", resp);

  res.send(resp);
}
