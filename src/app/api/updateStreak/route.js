import clientPromise from "@/app/lib/mongodb";
import { compareDate } from "@/app/components/makeDate";
export async function POST(req) {
  const { email, id, date, prevDate, streak, longest, check } =
    await req.json();

  let streakVal = streak;
  if (compareDate(prevDate, date)) {
    streakVal = 0;
  }
  let change = check ? 1 : -1;
  //value for the longest streak
  let longestVal = streakVal >= longest ? streakVal + change : longest;

  const mongoClient = await clientPromise;
  const updateStreak = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .updateOne(
      { email: email, "habits.id": id },
      {
        $set: {
          "habits.$.streak": {
            latest: date,
            longest: longestVal,
            streak: streakVal + change,
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
