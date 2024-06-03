"use client";
import styles from "@/app/styles/habits.module.css";
import { useRouter } from "next/navigation";
import { Checkbox } from "@mui/material";
import { useState } from "react";
export default function Todo(props) {
  const router = useRouter();
  const [marked, setMarked] = useState(props.check);
  async function handleDelete() {
    await fetch("http://localhost:3000/api/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        id: props.id,
        type: "habit",
      }),
    });
    router.refresh();
  }
  async function handleClick() {
    setMarked(!marked);
    await fetch("http://localhost:3000/api/habitCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        id: props.id,
        check: marked,
      }),
    });
    router.refresh();
  }
  return (
    <>
      <div
        className={`${styles.habitcontainer} ${marked ? styles.active : ""} `}
      >
        <h1>{props.title}</h1>
        <Checkbox onChange={handleClick} checked={marked} />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}
