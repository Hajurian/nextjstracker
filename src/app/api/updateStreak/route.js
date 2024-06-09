import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { email, id, date, streak } = await req.json();
  const mongoClient = await clientPromise;
  //removing habit
  const updateStreak = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .updateOne(
      { email: email, "habits.id": id },
      {
        $set: {
          "habits.$.streak": {
            latest: date,
          },
        },
      }
    );
  if (updateStreak) {
    return Response.json(
      { message: "Successfully updated habit" },
      { status: 200 }
    );
  } else {
    return Response.json({ message: "Invalid user." }, { status: 500 });
  }
}
