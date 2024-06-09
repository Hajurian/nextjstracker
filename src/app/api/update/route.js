import clientPromise from "@/app/lib/mongodb";
import { makeDate } from "@/app/components/makeDate";
export async function POST(req) {
  const { email, todo, description, type, id, date } = await req.json();
  const mongoClient = await clientPromise;
  if (type == "todos") {
    //ADDING TO TODOS
    const todoToAdd = await mongoClient
      .db("NextjsTracker")
      .collection("Users")
      .updateOne(
        { email: email },
        {
          $push: {
            todos: { todo: todo, description: description, date: date, id: id },
          },
        }
      );
    if (todoToAdd) {
      return Response.json({ message: "Successfully pushed" }, { status: 200 });
    } else {
      return Response.json({ message: "Invalid user." }, { status: 500 });
    }
  } else {
    //ADDING TO HABITS
    const todoToAdd = await mongoClient
      .db("NextjsTracker")
      .collection("Users")
      .updateOne(
        { email: email },
        {
          $push: {
            habits: {
              habit: todo,
              id: id,
              check: false,
              streak: {
                latest: "",
                streak: 0,
                longest: 0,
              },
            },
          },
        }
      );
    if (todoToAdd) {
      return Response.json({ message: "Successfully pushed" }, { status: 200 });
    } else {
      return Response.json({ message: "Invalid user." }, { status: 500 });
    }
  }
}
