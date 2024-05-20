import { MongoClient } from "mongodb";
if (!process.env.MONGOCLIENTID) {
  throw new Error("Invalid environment variable");
}
const uri = process.env.MONGOCLIENTID;
const options = {};

let client;
let clientPromise;

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
