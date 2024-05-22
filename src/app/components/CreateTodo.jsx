"use client";
import styles from "@/app/styles/create.module.css";
import { Button } from "@mui/material";
import { useState } from "react";
export default function CreateTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit({
      title: title,
      description: description,
    });
    setTitle("");
    setDescription("");
    props.submitOnClose();
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.createTodo}>
        <label>Task</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
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
