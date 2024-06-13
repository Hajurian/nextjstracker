import styles from "@/app/styles/home.module.css";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return (
      <>
        <h1>No session</h1>
      </>
    );
  }
  const res = await fetch("http://localhost:3000/api/getUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: session?.user?.email,
    }),
  });
  const user = await res.json();
  return (
    <>
      <div className={styles.homecontainer}>
        <div className={styles.topcontainer}>
          <div className={styles.smallinfo}></div>
          <div className={styles.smallinfo}></div>
          <div className={styles.smallinfo}></div>
        </div>
        <div className={styles.middlecontainer}>
          <div className={styles.calendarcontainer}>Calendar</div>
          <div>Mr Incredibles thing</div>
        </div>
        <div className={styles.bottomcontainer}>
          <div className={styles.todobox}>Todo list</div>
          <div className={styles.habitbox}>Habits</div>
        </div>
      </div>
    </>
  );
}
