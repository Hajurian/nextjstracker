import CreateTodoModal from "../components/CreateTodoModal";
import { getServerSession } from "next-auth";
import styles from "@/app/styles/todos.module.css";
import { getUser } from "../components/UserData";
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
  //the submit function
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
        description: description,
      }),
    });
  }
  const currentUser = await getTodos();

  return (
    <>
      <div className={styles.topbar}>
        <h1>Todos</h1>
        <CreateTodoModal handleSubmit={handleSubmit} />
      </div>
      <div className={styles.todoscontainer}>
        {currentUser &&
          currentUser.map((todo, id) => {
            return <Todo key={id} title={todo.todo} desc={todo.description} />;
          })}
      </div>
    </>
  );
}
