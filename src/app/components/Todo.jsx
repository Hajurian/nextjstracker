import styles from "@/app/styles/todos.module.css";
export default function Todo(props) {
  return (
    <>
      <div className={styles.todocontainer}>
        <h1>{props.title}</h1>
        <h1>{props.desc}</h1>
      </div>
    </>
  );
}
