import { db } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { username, password } = req.body;

  const collection = db.collection("user");

  console.log(username);

  await collection.createIndex({ username: 1 }, { unique: true });

  try {
    await collection.insertOne({
      username: username,
      password: password,
      date: new Date(),
    });
  } catch (err) {
    res.send(err);
  }

  res.end();
}
