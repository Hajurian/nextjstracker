import CreateTodoModal from "../components/CreateTodoModal";
import { getServerSession } from "next-auth";
import styles from "@/app/styles/todos.module.css";
import { redirect } from "next/navigation";

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
    return user.user.habits;
  }
  const currentUser = await getTodos();
  return (
    <>
      <div className={styles.topbar}>
        <h1>All Habits</h1>
        <CreateTodoModal email={session.user.email} />
      </div>
      <div className={styles.todoscontainer}></div>
    </>
  );
}
