import { db } from "../../../lib/mongodb";
import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  const { name } = req.body;

  const chat = db.collection("chat");

  const data = await chat
    .aggregate([
      { $match: { name: name } },
      // Expand the scores array into a stream of documents
      { $unwind: "$messages" },
      {
        $project: {
          name: "$name",
          //   date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          date: "$date",
          messages: "$messages",
        },
      },
      // Sort in descending order
      {
        $sort: {
          "messages.date": -1,
        },
      },
    ])
    .toArray();

  await pusher.trigger("chat", "getMessage", data);

  res.send(data);
}
