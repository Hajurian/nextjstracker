import styles from "@/app/styles/home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.homecontainer}>
        <div>Calendar</div>
        <div>Todo list</div>
        <div>Habits</div>
        <div>Mr Incredibles thing</div>
      </div>
    </>
  );
}
