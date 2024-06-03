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
        <label>{props.type == "todos" ? "Task" : "Habit"}</label>
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          required
        />
        {props.type == "todos" ? (
          <>
            <label>Description</label>
            <input
              type="text"
              value={description}
              maxLength={75}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </>
        ) : null}
        {props.type == "todos" ? (
          <>
            <label>Due date</label>
            <input
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />
          </>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
