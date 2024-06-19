import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Todo from "../components/Todo";
import { makeDate } from "../components/makeDate";
import styles from "@/app/styles/todos.module.css";

export default async function Todos() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  //function to get the todos
  async function getTodos() {
    const link = new URL(`${process.env.NEXT_PUBLIC_URL}/api/getUser`);
    const res = await fetch(link, {
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
  //function to get today's date
  //getting the todos and sorting them
  let currentUser = await getTodos();
  currentUser = currentUser.sort((a, b) => a.date.localeCompare(b.date));
  //today's date
  const date = makeDate();
  //the count to delay the card animations
  let count = 0;
  return (
    <>
      <h1 className={styles.header}>Upcoming Tasks</h1>
      <div className={styles.container}>
        {currentUser &&
          currentUser.map((todo, id) => {
            if (date.localeCompare(todo.date) <= 0) {
              count++;
              return (
                <Todo
                  key={id}
                  title={todo.todo}
                  desc={todo.description}
                  date={todo.date}
                  id={todo.id}
                  email={session.user.email}
                  time={count}
                />
              );
            }
          })}
      </div>
      <h1 className={styles.header}>Late Tasks</h1>
      <div className={styles.container}>
        {currentUser &&
          currentUser.map((todo, id) => {
            if (date.localeCompare(todo.date) > 0) {
              count++;
              return (
                <Todo
                  key={id}
                  title={todo.todo}
                  desc={todo.description}
                  date={todo.date}
                  id={todo.id}
                  email={session.user.email}
                  time={count}
                />
              );
            }
          })}
      </div>
    </>
  );
}
