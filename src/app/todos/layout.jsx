import CreateTodoModal from "../components/CreateTodoModal";
import { getServerSession } from "next-auth";
import styles from "@/app/styles/todos.module.css";
import { redirect } from "next/navigation";

export default async function Todos({ children }) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const link = new URL(`${process.env.NEXTAUTH_URL}/api/getUser`);
  const res = await fetch(link, {
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
      <div className={styles.topbar}>
        <h1 className={styles.title}>
          All Tasks -{" "}
          <span style={{ color: "#37e3f0", cursor: "pointer" }}>
            {user.user.todos.length > 0
              ? `${user.user.todos.length} ${
                  user.user.todos.length == 1 ? "Task" : "Tasks"
                } Remaining`
              : "You Have No tasks"}
          </span>
        </h1>
        <div className={styles.createButton}>
          <CreateTodoModal email={session.user.email} type="todos" />
        </div>
      </div>
      <div className={styles.todoscontainer}>{children}</div>
    </>
  );
}
