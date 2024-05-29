import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Todo from "../components/Todo";

export default async function Todos() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  //function to get the todos
  async function getTodos() {
    const res = await fetch("http://localhost:3000/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    const user = await res.json();
    return user.user.todos;
  }
  const currentUser = await getTodos();
  return (
    <>
      {currentUser &&
        currentUser.map((todo, id) => {
          return (
            <Todo
              key={id}
              title={todo.todo}
              desc={todo.description}
              id={todo.id}
              email={session.user.email}
            />
          );
        })}
    </>
  );
}
