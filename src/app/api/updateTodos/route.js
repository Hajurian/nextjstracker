import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { email, todo, description } = await req.json();
  const mongoClient = await clientPromise;
  const user = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .updateOne(
      { email: email },
      {
        $set: { name: "hello" },
        $push: { todos: { todo: todo, description: description } },
      }
    );
  if (user) {
    return Response.json({ user: user }, { status: 200 });
  } else {
    return Response.json({ message: "Invalid user." }, { status: 500 });
  }
}
