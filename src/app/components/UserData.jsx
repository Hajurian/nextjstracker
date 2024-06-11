import { getServerSession } from "next-auth";

export default async function UserData() {
  const session = await getServerSession();
  const res = await fetch("http://localhost:3000/api/getUser", {
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
