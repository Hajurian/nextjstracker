"use client";
import styles from "@/app/styles/todos.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
export default function Todo(props) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [editDesc, setEditDesc] = useState(props.desc);
  const [editDate, setEditDate] = useState(props.date);
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
        date: editDate,
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
            maxLength={32}
          />
          <input
            type="text"
            value={editDesc}
            onChange={(e) => {
              setEditDesc(e.target.value);
            }}
            maxLength={75}
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => {
              setEditDate(e.target.value);
            }}
          />
          <div className={styles.buttoncontainer}>
            <button onClick={handleEdit}>Save</button>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={styles.todocontainer}
        style={{ animationDelay: `${props.time * 0.2}s` }}
      >
        <h1>{props.title}</h1>
        <p style={{ color: "#37e3f0" }}>{props.date}</p>
        <p className={styles.desc}>{props.desc}</p>
        <div className={styles.buttoncontainer}>
          <button
            onClick={() => {
              setEdit(true);
            }}
            className={styles.editbutton}
          >
            <CiEdit size={18} />
            Edit
          </button>
          <button onClick={handleDelete} className={styles.deletebutton}>
            <FaTrash size={25} />
          </button>
        </div>
      </div>
    </>
  );
}
