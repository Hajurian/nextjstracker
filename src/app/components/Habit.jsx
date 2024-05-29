"use client";
import styles from "@/app/styles/habits.module.css";
import { useRouter } from "next/navigation";
import { Checkbox } from "@mui/material";
import { useState } from "react";
export default function Todo(props) {
  const router = useRouter();
  const [marked, setMarked] = useState(false);
  async function handleDelete() {
    await fetch("http://localhost:3000/api/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        id: props.id,
      }),
    });
    router.refresh();
  }
  function handleClick() {
    setMarked(!marked);
  }
  return (
    <>
      <div className={styles.habitcontainer}>
        <h1>{props.title}</h1>
        <Checkbox onChange={handleClick} />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}
