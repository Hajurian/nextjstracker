import { getServerSession } from "next-auth";

export default async function UserData() {
  const session = await getServerSession();
  const data = session.user;

  return (
    <>
      <h1>Name: {data.name}</h1>
      <h2>Email: {data.email}</h2>
    </>
  );
}
