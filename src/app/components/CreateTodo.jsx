"use client";
import styles from "@/app/styles/create.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function CreateTodo(props) {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:3000/api/updateTodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        todo: todo,
        description: description,
      }),
      cache: "no-store",
    });
    setTodo("");
    setDescription("");
    router.refresh();
    props.submitOnClose();
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.createTodo}>
        <label>Task</label>
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
