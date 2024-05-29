import CreateTodoModal from "../components/CreateTodoModal";
import { getServerSession } from "next-auth";
import styles from "@/app/styles/todos.module.css";
import { redirect } from "next/navigation";

export default async function Todos({ children }) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <div className={styles.topbar}>
        <h1 className={styles.title}>All Tasks</h1>
        <div className={styles.createButton}>
          <CreateTodoModal email={session.user.email} type="todos" />
        </div>
      </div>
      <div className={styles.todoscontainer}>{children}</div>
    </>
  );
}
