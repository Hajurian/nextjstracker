import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Todo from "../components/Todo";
import styles from "@/app/styles/todos.module.css";

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
  function makeDate() {
    let today = new Date();
    return `${today.getFullYear()}-${
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : `${today.getMonth() + 1}`
    }-${today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`}`;
  }
  let currentUser = await getTodos();
  currentUser = currentUser.sort((a, b) => a.date.localeCompare(b.date));
  const date = makeDate();
  return (
    <>
      <h1 className={styles.header}>Upcoming Tasks</h1>
      <div className={styles.container}>
        {currentUser &&
          currentUser.map((todo, id) => {
            if (date.localeCompare(todo.date) <= 0) {
              return (
                <Todo
                  key={id}
                  title={todo.todo}
                  desc={todo.description}
                  date={todo.date}
                  id={todo.id}
                  email={session.user.email}
                  time={id}
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
              return (
                <Todo
                  key={id}
                  title={todo.todo}
                  desc={todo.description}
                  date={todo.date}
                  id={todo.id}
                  email={session.user.email}
                  time={id}
                />
              );
            }
          })}
      </div>
    </>
  );
}
