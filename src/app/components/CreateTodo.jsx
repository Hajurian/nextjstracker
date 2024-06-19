"use client";
import styles from "@/app/styles/create.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function CreateTodo(props) {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const link = new URL(`${process.env.NEXTAUTH_URL}/api/update`);
    await fetch(link, {
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
        date: date,
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
        <h1>{props.type == "todos" ? "Create a Task" : "Create a Habit"}</h1>
        <div className={styles.inputbox}>
          <label>{props.type == "todos" ? "Task" : "Habit"}</label>
          <input
            type="text"
            value={todo}
            className={styles.title}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            maxLength={32}
            required
          />
        </div>
        {props.type == "todos" ? (
          <>
            <div className={styles.inputbox}>
              <label>Description</label>
              <textarea
                type="text"
                value={description}
                className={styles.desc}
                maxLength={75}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </>
        ) : null}
        {props.type == "todos" ? (
          <>
            <div className={styles.inputbox}>
              <label>Due date</label>
              <input
                type="date"
                className={styles.date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
            </div>
          </>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
