import { db } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { name, message, username } = req.body;

  const collection = db.collection("chat");

  await collection.updateOne(
    { name },
    {
      $push: {
        messages: {
          _id: new ObjectId(),
          username,
          message,
          date: new Date(),
        },
      },
    }
  );

  res.end();
}
