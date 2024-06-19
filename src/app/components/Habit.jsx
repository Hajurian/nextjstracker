"use client";
import styles from "@/app/styles/habits.module.css";
import { useRouter } from "next/navigation";
import { makeDate } from "./makeDate";
import { Checkbox } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function Todo(props) {
  const router = useRouter();
  const [marked, setMarked] = useState(props.check);
  useEffect(() => {
    if (makeDate().localeCompare(props.streak.latest) != 0) {
      setMarked(false);
    }
  }, []);

  //the delete function
  async function handleDelete() {
    const link = new URL(`${process.env.NEXT_PUBLIC_URL}/api/remove`);
    await fetch(link, {
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
  //the click function
  async function handleClick() {
    const linkCheck = new URL(`${process.env.NEXT_PUBLIC_URL}/api/habitCheck`);
    setMarked(!marked);
    await fetch(linkCheck, {
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

    //the streak updating function
    const linkUpdate = new URL(
      `${process.env.NEXT_PUBLIC_URL}/api/updateStreak`
    );
    await fetch(linkUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        id: props.id,
        prevDate: props.streak.latest,
        date: makeDate(),
        streak: props.streak.streak,
        longest: props.streak.longest,
        check: !marked,
      }),
    });
    router.refresh();
  }
  return (
    <>
      <div
        className={`${styles.habitcontainer} ${marked ? styles.active : ""} `}
      >
        <div className={styles.topcontainer}>
          <h1
            className={styles.habittitle}
            style={{ textDecoration: `${marked ? "line-through" : "none"}` }}
          >
            {props.title}
          </h1>
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
        <div className={styles.streakcontainer}>
          <div className={styles.streak}>
            <p style={{ fontSize: "2rem" }}>{props.streak.streak}</p>
            <p style={{ opacity: 0.7 }}>Current Streak</p>
          </div>
          <div className={styles.streak}>
            <p style={{ fontSize: "2rem" }}>{props.streak.longest}</p>
            <p style={{ opacity: 0.7 }}>Longest Streak</p>
          </div>
        </div>
      </div>
    </>
  );
}
