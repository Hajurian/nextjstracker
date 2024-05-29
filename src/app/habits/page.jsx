import CreateTodoModal from "../components/CreateTodoModal";
import { getServerSession } from "next-auth";
import styles from "@/app/styles/habits.module.css";
import { redirect } from "next/navigation";
import Habit from "../components/Habit";
import clientPromise from "../lib/mongodb";

export default async function Habits() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  //function to get the todos
  async function getHabits() {
    const res = await fetch("http://localhost:3000/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    const user = await res.json();
    return user.user.habits;
  }
  const currentUser = await getHabits();

  function handlePercent(percent) {
    return `${Math.floor(Math.random() * 100000000) + 10000000}`;
  }
  return (
    <>
      <div className={styles.topbar}>
        <h1 className={styles.title}>All Habits {handlePercent()}</h1>
        <div className={styles.createButton}>
          <CreateTodoModal email={session.user.email} type="habits" />
        </div>
      </div>
      <div className={styles.habitscontainer}>
        {currentUser &&
          currentUser.map((habit, id) => {
            return (
              <Habit
                key={id}
                title={habit.habit}
                id={habit.id}
                check={habit.check}
                email={session.user.email}
              />
            );
          })}
      </div>
    </>
  );
}
