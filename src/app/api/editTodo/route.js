import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { email, id, title, desc, date } = await req.json();
  const mongoClient = await clientPromise;
  //editing todo
  const editTodo = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .updateOne(
      { email: email, "todos.id": id },
      {
        $set: {
          "todos.$.todo": title,
          "todos.$.description": desc,
          "todos.$.date": date,
        },
      }
    );
  if (editTodo) {
    return Response.json(
      { message: "Successfully updated todo" },
      { status: 200 }
    );
  } else {
    return Response.json({ message: "Invalid user." }, { status: 500 });
  }
}
