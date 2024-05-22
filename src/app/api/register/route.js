import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
  const { name, email } = await req.json();
  const mongoClient = await clientPromise;
  const user = await mongoClient
    .db("NextjsTracker")
    .collection("Users")
    .findOne({ email: email });
  return Response.json({ user });
  // mongoClient.db("NextjsTracker").collection("Users").insertOne({
  //   name: name,
  //   email: email,
  // });
  // return new NextResponse().json({ user: user });
}
