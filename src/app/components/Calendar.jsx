"use client";
import Calendar from "react-calendar";
import { createDate } from "./makeDate";
import "../styles/Calendar.css";
import { useState } from "react";
export default function CalendarComponent(props) {
  const todos = props.todos;
  const [active, setActive] = useState("");
  if (!todos) {
    return <Calendar />;
  }
  return (
    <>
      <Calendar
        onClickDay={(day) => {
          const date = createDate(
            day.getMonth() + 1,
            day.getDate(),
            day.getFullYear()
          );
          setActive(date);
        }}
        tileContent={(day) => {
          const date = createDate(
            day.date.getMonth() + 1,
            day.date.getDate(),
            day.date.getFullYear()
          );
          const numtasks = todos.filter(
            (todo) => todo.date.localeCompare(date) == 0
          ).length;
          if (numtasks > 0) {
            if (active.localeCompare(date) == 0) {
              return todos.map((todo, id) => {
                if (id < 3 && todo.date.localeCompare(active) == 0) {
                  return <li key={id}>{todo.todo}</li>;
                }
                return;
              });
            }
            return (
              <p>
                {numtasks > 1
                  ? `${numtasks} Tasks Remaining`
                  : `${numtasks} Task Remaining`}
              </p>
            );
          }
        }}
      />
    </>
  );
}
