"use client";
import styles from "@/app/styles/habits.module.css";
import { useRouter } from "next/navigation";
import { makeDate } from "./makeDate";
import { Checkbox } from "@mui/material";
import { FaTrash } from "react-icons/fa";
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
        check: !marked,
      }),
    });
    if (!marked) {
      await fetch("http://localhost:3000/api/updateStreak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          id: props.id,
          date: makeDate(),
          currStreak: props.streak.streak,
        }),
      });
    }
    router.refresh();
  }
  return (
    <>
      <div
        className={`${styles.habitcontainer} ${marked ? styles.active : ""} `}
      >
        <h1>{props.title}</h1>
        <div className={styles.streakcontainer}>
          <p>Current Streak {props.streak.streak.toString()}</p>
          <p>Longest Streak</p>
        </div>
        <div className={styles.buttoncontainer}>
          <Checkbox
            onChange={handleClick}
            checked={marked}
            color="secondary"
            size="large"
          />
          <button onClick={handleDelete} className={styles.deletebutton}>
            <FaTrash size={25} />
          </button>
        </div>
      </div>
    </>
  );
}
