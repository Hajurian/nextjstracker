import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { email, todo, description } = await req.json();
  const mongoClient = await clientPromise;
  const todoToAdd = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .updateOne(
      { email: email },
      {
        $push: { todos: { todo: todo, description: description } },
      }
    );
  if (todoToAdd) {
    return Response.json({ message: "Successfully pushed" }, { status: 200 });
  } else {
    return Response.json({ message: "Invalid user." }, { status: 500 });
  }
}
