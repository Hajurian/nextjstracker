"use client";
import styles from "@/app/styles/navbar.module.css";
import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
  const [active, setActive] = useState("");
  function activeNavbar(val) {
    setActive(val);
  }

  return (
    <>
      <Link
        href="/"
        className="title"
        onClick={() => {
          activeNavbar("Home");
        }}
      >
        Productivity Tracker
      </Link>
      <div className={styles.links}>
        <Link
          href="/"
          className={`${styles.link} ${active == "Home" ? styles.active : ""}`}
          onClick={(e) => {
            activeNavbar(e.target.text);
          }}
        >
          Home
        </Link>
        <Link
          href="/todos"
          className={`${styles.link} ${active == "Todos" ? styles.active : ""}`}
          onClick={(e) => {
            activeNavbar(e.target.text);
          }}
        >
          Todos
        </Link>
        <Link
          href="/habits"
          className={`${styles.link} ${
            active == "Habits" ? styles.active : ""
          }`}
          onClick={(e) => {
            activeNavbar(e.target.text);
          }}
        >
          Habits
        </Link>
      </div>
    </>
  );
}
