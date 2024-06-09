import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { email, id, check } = await req.json();
  const mongoClient = await clientPromise;
  //removing habit
  const habitCheck = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .updateOne(
      { email: email, "habits.id": id },
      {
        $set: { "habits.$.check": check },
      }
    );
  if (habitCheck) {
    return Response.json(
      { message: "Successfully updated habit" },
      { status: 200 }
    );
  } else {
    return Response.json({ message: "Invalid user." }, { status: 500 });
  }
}
