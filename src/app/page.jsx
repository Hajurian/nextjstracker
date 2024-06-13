import styles from "@/app/styles/home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.homecontainer}>
        <div className={styles.topcontainer}>
          <div className={styles.calendarcontainer}>Calendar</div>
          <div>Mr Incredibles thing</div>
        </div>
        <div className={styles.bottomcontainer}>
          <div>Todo list</div>
          <div>Habits</div>
        </div>
      </div>
    </>
  );
}
