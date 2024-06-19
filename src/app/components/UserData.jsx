import { getServerSession } from "next-auth";

export default async function UserData() {
  const session = await getServerSession();
  const link = new URL(`${process.env.NEXT_PUBLIC_URL}/api/getUser`);
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: session?.user?.email,
    }),
  });
  const user = await res.json();

  return (
    <>
      <h2 className="userinfo">Logged in as {user.user.email}</h2>
    </>
  );
}
