"use client";
import styles from "@/app/styles/todos.module.css";
export default function Todo(props) {
  async function handleDelete() {
    await fetch("http://localhost:3000/api/removeTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        todo: props.title,
      }),
    });
  }
  return (
    <>
      <div className={styles.todocontainer}>
        <h1>{props.title}</h1>
        <h1>{props.desc}</h1>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}
