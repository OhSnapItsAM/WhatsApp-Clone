import { db } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { name } = req.body;

  const collection = db.collection("chat");

  await collection.createIndex({ name: 1 }, { unique: true });

  await collection.insertOne({
    name: name,
    date: new Date(),
    messages: [],
  });

  res.send("Worked");
}
