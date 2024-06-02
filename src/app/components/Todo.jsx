"use client";
import styles from "@/app/styles/todos.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Todo(props) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [editDesc, setEditDesc] = useState(props.desc);
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
  async function handleEdit() {
    await fetch("http://localhost:3000/api/editTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        id: props.id,
        title: editTitle,
        desc: editDesc,
      }),
    });
    setEdit(false);
    router.refresh();
  }
  if (edit) {
    return (
      <>
        <div className={styles.todocontainer}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />
          <textarea
            type="text"
            value={editDesc}
            onChange={(e) => {
              setEditDesc(e.target.value);
            }}
          />
          <button onClick={handleEdit}>Save</button>
          <button
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.todocontainer}>
        <h1>{props.title}</h1>
        <p>{props.desc}</p>
        <button
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}
