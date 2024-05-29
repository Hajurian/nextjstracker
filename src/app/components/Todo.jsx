"use client";
import styles from "@/app/styles/todos.module.css";
import { useRouter } from "next/navigation";
export default function Todo(props) {
  const router = useRouter();
  async function handleDelete() {
    await fetch("http://localhost:3000/api/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        id: props.id,
        type: "todos",
      }),
    });
    router.refresh();
  }
  return (
    <>
      <div className={styles.todocontainer}>
        <h1>{props.title}</h1>
        <p>{props.desc}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}
