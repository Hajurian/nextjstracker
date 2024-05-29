"use client";
import { Fab, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CreateTodo from "./CreateTodo";
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
      <Fab color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </>
  );
}
