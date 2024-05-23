"use client";
import styles from "@/app/styles/create.module.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function CreateTodo(props) {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit({
      todo: todo,
      description: description,
    });
    setTodo("");
    setDescription("");
    router.refresh();
    router.push("/todos");
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
