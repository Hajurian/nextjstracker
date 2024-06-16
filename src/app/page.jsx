import styles from "@/app/styles/home.module.css";
import { getServerSession } from "next-auth";
import { makeDate } from "./components/makeDate";

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
  const date = makeDate();
  return (
    <>
      <div className={styles.homecontainer}>
        <div className={styles.topcontainer}>
          <div className={styles.smallinfo}>
            <h1>Today's Date</h1>
            <h2>{date}</h2>
          </div>
          <div className={styles.smallinfoprimary}>
            <h1>Todos </h1>
            <h2>{user.user.todos.length} Remaining</h2>
          </div>
          <div className={styles.smallinfosecondary}>
            <h1>Habits</h1>
          </div>
        </div>
        <div className={styles.middlecontainer}>
          <div className={styles.calendarcontainer}>Calendar</div>
          <div className={styles.todobox}>
            <h1>Todos</h1>
            {user.user.todos.map((todo, id) => {
              if (id > 2) {
                return;
              }
              return (
                <div key={id} className={styles.todoboxcontent}>
                  <h2>{todo.todo}</h2>
                  <h2>{todo.date}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.bottomcontainer}></div>
      </div>
    </>
  );
}
