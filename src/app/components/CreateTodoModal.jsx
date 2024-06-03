"use client";
import { Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CreateTodo from "./CreateTodo";
import styles from "@/app/styles/create.module.css";
export default function CreateTodoModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <CreateTodo
          submitOnClose={handleClose}
          email={props.email}
          type={props.type}
        />
      </Modal>
      <button onClick={handleOpen} className={styles.add}>
        <AddIcon htmlColor="#FAF9F6" />
      </button>
    </>
  );
}
