import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { email, todo } = await req.json();
  const mongoClient = await clientPromise;
  const todoToRemove = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .updateOne(
      { email: email },
      {
        $pull: { todos: { todo: todo } },
      }
    );
  if (todoToRemove) {
    return Response.json({ message: "Successfully pulled" }, { status: 200 });
  } else {
    return Response.json({ message: "Invalid user." }, { status: 500 });
  }
}
