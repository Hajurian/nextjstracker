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
    await fetch("http://localhost:3000/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        type: props.type,
        id: Math.floor(Math.random() * 100000000) + 10000000,
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
        <label>{props.type == "todos" ? "Task" : "Habit"}</label>
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        {props.type == "todos" ? (
          <>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </>
        ) : null}
        {props.type == "todos" ? <input type="date" /> : null}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
