import styles from "@/app/styles/navbar.module.css";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/todos" className={styles.link}>
          Todos
        </Link>
        <Link href="/habits" className={styles.link}>
          Habits
        </Link>
      </div>
    </>
  );
}
