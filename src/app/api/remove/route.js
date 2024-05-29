import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { email, id, type } = await req.json();
  const mongoClient = await clientPromise;
  if (type == "todos") {
    //REMOVING TODO
    const todoToRemove = await mongoClient
      .db("NextjsTracker")
      .collection("Users")
      .updateOne(
        { email: email },
        {
          $pull: { todos: { id: id } },
        }
      );
    if (todoToRemove) {
      return Response.json(
        { message: "Successfully pulled todo" },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Invalid user." }, { status: 500 });
    }
  } else {
    //removing habit
    const todoToRemove = await mongoClient
      .db("NextjsTracker")
      .collection("Users")
      .updateOne(
        { email: email },
        {
          $pull: { habits: { id: id } },
        }
      );
    if (todoToRemove) {
      return Response.json(
        { message: "Successfully pulled habit" },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Invalid user." }, { status: 500 });
    }
  }
}
