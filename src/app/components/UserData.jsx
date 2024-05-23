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
      <h1>Name: {user.user.name}</h1>
      <h2>Email: {user.user.email}</h2>
    </>
  );
}
