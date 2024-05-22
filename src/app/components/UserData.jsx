import { getServerSession } from "next-auth";

//function to fetch user data with the session user email
export async function getUser(email) {
  const res = await fetch("http://localhost:3000/api/getUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
    cache: "no-store",
  });
  return res.json();
}

export default async function UserData() {
  const session = await getServerSession();
  const { email } = session?.user;
  const data = await getUser(email);

  return (
    <>
      <h1>Name: {data.user.name}</h1>
      <h2>Email: {data.user.email}</h2>
    </>
  );
}
