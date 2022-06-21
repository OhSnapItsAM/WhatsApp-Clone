import { db } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { username } = req.body;

  const collection = db.collection("user");

  const resp = await collection.find({ username }).toArray();

  res.send(resp);
}
