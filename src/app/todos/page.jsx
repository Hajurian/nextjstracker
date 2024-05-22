import CreateTodoModal from "../components/CreateTodoModal";
import { getServerSession } from "next-auth";
import styles from "@/app/styles/todos.module.css";

export default async function Todos() {
  const session = await getServerSession();

  async function handleSubmit(data) {
    "use server";
    const { todo, description } = data;
    await fetch("http://localhost:3000/api/updateTodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
        todo: todo,
      }),
      cache: "no-store",
    });
  }

  return (
    <>
      <div className={styles.topbar}>
        <h1>Todos</h1>
        <CreateTodoModal handleSubmit={handleSubmit} />
      </div>
      <div className="todoscontainer"></div>
    </>
  );
}
